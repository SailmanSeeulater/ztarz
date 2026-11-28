import "server-only";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { activity, labAttempt, reviewLog, session } from "@/db/schema";
import { buildLog, type ActivityEvent, type ActivityKind } from "@/lib/activity";
import { getCard, getLab, isPrivate } from "@/lib/content";
import { appTimeZone } from "@/lib/srs/day";

/** Records something the other tables don't. Never throws: a failed log line mustn't fail the action. */
export async function logActivity(userId: string, kind: ActivityKind, summary: string, href?: string) {
  try {
    await db.insert(activity).values({ userId, kind, summary: summary.slice(0, 300), href });
  } catch (e) {
    console.error("activity log failed", e);
  }
}

const RATING: Record<string, string> = { again: "missed", hard: "hard", good: "good", easy: "easy" };

/** The most recent things you did, from every table that records one, as days of entries. */
export async function getActivityLog(userId: string, limit = 400) {
  const [reviews, labs, sessions, others] = await Promise.all([
    db
      .select({ cardId: reviewLog.cardId, rating: reviewLog.rating, at: reviewLog.reviewedAt })
      .from(reviewLog)
      .where(eq(reviewLog.userId, userId))
      .orderBy(desc(reviewLog.reviewedAt))
      .limit(limit),
    db
      .select({ labId: labAttempt.labId, status: labAttempt.status, at: labAttempt.createdAt })
      .from(labAttempt)
      .where(eq(labAttempt.userId, userId))
      .orderBy(desc(labAttempt.createdAt))
      .limit(limit),
    db
      .select({ at: session.createdAt })
      .from(session)
      .where(eq(session.userId, userId))
      .orderBy(desc(session.createdAt))
      .limit(50),
    db.select().from(activity).where(eq(activity.userId, userId)).orderBy(desc(activity.at)).limit(limit),
  ]);

  const events: ActivityEvent[] = [
    ...reviews.map((r) => {
      const card = getCard(r.cardId);
      return {
        at: r.at,
        kind: "review" as const,
        summary: `${card?.title ?? "A card that no longer exists"} · ${RATING[r.rating]}`,
        href: card && !isPrivate(card.id) ? `/cards/${card.id}` : null,
        missed: r.rating === "again",
      };
    }),
    ...labs.map((l) => ({
      at: l.at,
      kind: "lab" as const,
      summary: `Lab ${l.status}: ${getLab(l.labId)?.title ?? l.labId}`,
      href: getLab(l.labId) ? `/labs/${l.labId}` : null,
    })),
    ...sessions.map((s) => ({ at: s.at, kind: "signin" as const, summary: "Signed in" })),
    ...others.map((o) => ({ at: o.at, kind: o.kind as ActivityKind, summary: o.summary, href: o.href })),
  ];
  // Keep the newest `limit` overall, so one busy table can't push the others' recent rows out of view.
  events.sort((a, b) => b.at.getTime() - a.at.getTime());
  return buildLog(events.slice(0, limit), appTimeZone());
}
