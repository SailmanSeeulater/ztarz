import "server-only";
import { randomInt } from "node:crypto";
import { and, count, eq, gte, sql } from "drizzle-orm";
import { db } from "@/db";
import { cardState, reviewLog } from "@/db/schema";
import { allCards, getCard } from "@/lib/content";
import { appTimeZone, startOfDay, startOfTomorrow } from "@/lib/srs/day";
import { buildStreak, dayKey } from "@/lib/streak";
import {
  fromStored,
  getScheduler,
  previewIntervals,
  review,
  toStored,
  type RatingName,
} from "@/lib/srs/scheduler";
import { planToday } from "@/lib/srs/today";
import { buildWeeklyReport } from "@/lib/report";

/** A card answered again within this window comes back in the same session. */
const REQUEUE_WITHIN_MS = 30 * 60_000;

export async function getTodaySession(userId: string, now = new Date()) {
  const dayStart = startOfDay(now);
  const [rows, [introduced], reviewed] = await Promise.all([
    db
      .select({
        cardId: cardState.cardId,
        due: cardState.due,
        state: cardState.state,
        lastReview: cardState.lastReview,
        memory: cardState.memory,
      })
      .from(cardState)
      .where(eq(cardState.userId, userId)),
    db
      .select({ n: count() })
      .from(cardState)
      .where(and(eq(cardState.userId, userId), gte(cardState.introducedAt, dayStart))),
    db
      .selectDistinct({ cardId: reviewLog.cardId })
      .from(reviewLog)
      .where(and(eq(reviewLog.userId, userId), gte(reviewLog.reviewedAt, dayStart))),
  ]);

  const byId = new Map(rows.map((r) => [r.cardId, r]));
  const plan = planToday({
    cards: allCards(),
    states: new Map(
      rows.map((r) => [r.cardId, { due: r.due, learning: r.state === "learning" || r.state === "relearning" }]),
    ),
    now,
    dueBy: startOfTomorrow(now),
    introducedToday: introduced.n,
    reviewedToday: new Set(reviewed.map((r) => r.cardId)),
  });

  const scheduler = await getScheduler();
  const items = plan.flatMap(({ cardId, slot }) => {
    const card = getCard(cardId);
    if (!card) return []; // progress for a card whose file was deleted or renamed
    const row = byId.get(cardId);
    const prev = row ? fromStored(row) : null;
    return [{ card, slot, preview: previewIntervals(scheduler, { cardId, prev, now }) }];
  });

  const seen = new Set(rows.map((r) => r.cardId));
  return {
    items,
    seed: randomInt(2 ** 31), // shuffles choices this session; server-chosen so hydration matches
    totals: { cards: allCards().length, seen: allCards().filter((c) => seen.has(c.id)).length },
  };
}

export type TodaySession = Awaited<ReturnType<typeof getTodaySession>>;

/** Anki's convention: a card is mature once it's scheduled 21+ days after its last review. */
const MATURE_MS = 21 * 86_400_000;

export type ModuleProgress = { total: number; started: number; mature: number; due: number };

export async function getModuleProgress(userId: string, now = new Date()) {
  const rows = await db
    .select({ cardId: cardState.cardId, due: cardState.due, lastReview: cardState.lastReview, state: cardState.state })
    .from(cardState)
    .where(eq(cardState.userId, userId));
  const byId = new Map(rows.map((r) => [r.cardId, r]));
  const dueBy = startOfTomorrow(now).getTime();

  const progress: Record<string, ModuleProgress> = {};
  for (const card of allCards()) {
    const p = (progress[card.module] ??= { total: 0, started: 0, mature: 0, due: 0 });
    p.total++;
    const row = byId.get(card.id);
    if (!row) continue;
    p.started++;
    if (row.state === "review" && row.lastReview && row.due.getTime() - row.lastReview.getTime() >= MATURE_MS) p.mature++;
    if (row.due.getTime() < dueBy) p.due++;
  }
  return progress;
}

/** The last seven days of reviews plus every card's next due date, summarised. */
export async function getWeeklyReport(userId: string, now = new Date()) {
  // Eight days back covers the report's seven local days in any timezone.
  const since = new Date(startOfDay(now).getTime() - 8 * 86_400_000);
  const [reviews, due] = await Promise.all([
    db
      .select({ cardId: reviewLog.cardId, rating: reviewLog.rating, reviewedAt: reviewLog.reviewedAt })
      .from(reviewLog)
      .where(and(eq(reviewLog.userId, userId), gte(reviewLog.reviewedAt, since))),
    db.select({ cardId: cardState.cardId, due: cardState.due }).from(cardState).where(eq(cardState.userId, userId)),
  ]);
  return buildWeeklyReport({ cards: allCards(), reviews, due, now });
}

/** The daily streak, from the distinct local days that have at least one review. */
export async function getStreak(userId: string, now = new Date()) {
  const timeZone = appTimeZone();
  const day = sql<string>`to_char(${reviewLog.reviewedAt} at time zone ${timeZone}, 'YYYY-MM-DD')`;
  const rows = await db.selectDistinct({ day }).from(reviewLog).where(eq(reviewLog.userId, userId));
  return buildStreak(
    rows.map((r) => r.day),
    dayKey(now, timeZone),
  );
}

export class UnknownCardError extends Error {}

/**
 * Records one answer and reschedules the card. Idempotent on `reviewId`: a retried
 * request returns the current schedule without reviewing the card a second time.
 */
export async function recordReview(
  userId: string,
  input: { reviewId: string; cardId: string; rating: RatingName; correct?: boolean; durationMs?: number },
  now = new Date(),
) {
  if (!getCard(input.cardId)) throw new UnknownCardError(input.cardId);
  const scheduler = await getScheduler();
  const key = and(eq(cardState.userId, userId), eq(cardState.cardId, input.cardId));

  const next = await db.transaction(async (tx) => {
    // Lock the row so two reviews of the same card can't interleave.
    const [row] = await tx.select().from(cardState).where(key).for("update");
    const prev = row ? fromStored(row) : null;
    const result = review(scheduler, { cardId: input.cardId, prev, rating: input.rating, now });

    const inserted = await tx
      .insert(reviewLog)
      .values({
        id: input.reviewId,
        userId,
        cardId: input.cardId,
        rating: input.rating,
        correct: input.correct,
        durationMs: input.durationMs,
        revlog: JSON.parse(JSON.stringify(result.revlog)),
        reviewedAt: now,
      })
      .onConflictDoNothing({ target: reviewLog.id })
      .returning({ id: reviewLog.id });

    if (inserted.length === 0) return prev; // duplicate request: leave the schedule as it is

    const stored = toStored(result.card);
    await tx
      .insert(cardState)
      .values({ userId, cardId: input.cardId, introducedAt: now, ...stored })
      .onConflictDoUpdate({ target: [cardState.userId, cardState.cardId], set: stored });
    return result.card;
  });

  const due = next?.dueAt ?? now;
  return {
    due,
    requeue: due.getTime() - now.getTime() <= REQUEUE_WITHIN_MS,
    preview: previewIntervals(scheduler, { cardId: input.cardId, prev: next, now }),
  };
}
