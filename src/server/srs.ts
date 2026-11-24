import "server-only";
import { and, count, eq, gte } from "drizzle-orm";
import { db } from "@/db";
import { cardState, reviewLog } from "@/db/schema";
import { allCards, getCard } from "@/lib/content";
import { startOfDay, startOfTomorrow } from "@/lib/srs/day";
import {
  fromStored,
  getScheduler,
  previewIntervals,
  review,
  toStored,
  type RatingName,
} from "@/lib/srs/scheduler";
import { planToday } from "@/lib/srs/today";

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
    totals: { cards: allCards().length, seen: allCards().filter((c) => seen.has(c.id)).length },
  };
}

export type TodaySession = Awaited<ReturnType<typeof getTodaySession>>;

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
