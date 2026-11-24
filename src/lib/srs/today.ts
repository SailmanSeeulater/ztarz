import { MODULES, type Card, type CardType } from "@/lib/content/schema";

// Decides what goes into today's session. Pure, so it's easy to test.

export type Slot = "review" | "new" | "drill" | "out-loud";
export type PlannedItem = { cardId: string; slot: Slot };

export type PlanInput = {
  cards: Card[]; // all content, any order
  /** Cards the user has seen. `learning` cards use short steps, so they're due at their exact time. */
  states: Map<string, { due: Date; learning?: boolean }>;
  now: Date;
  /** Review-state cards due before this (usually the start of tomorrow) count as due today. */
  dueBy?: Date;
  introducedToday: number; // cards first seen since the start of today
  /** Cards already answered today: the drill and out-loud slots are filled at most once a day. */
  reviewedToday?: Set<string>;
  newPerDay?: number;
  maxReviews?: number;
};

const DRILL: CardType[] = ["what-prints", "bug-hunt"];
const NEW_TYPES: CardType[] = ["concept", "mcq", "comparison"];
const MODULE_ORDER = Object.keys(MODULES);

/** Curriculum order: foundations first, then branches, then file path. */
export const byCurriculum = (a: Card, b: Card) =>
  MODULE_ORDER.indexOf(a.module) - MODULE_ORDER.indexOf(b.module) || a.id.localeCompare(b.id);

/**
 * 1. Reviews: every card due today, oldest due first (capped).
 * 2. New: unseen concept/mcq/comparison cards in curriculum order, within the daily budget.
 * 3. Drill: one what-prints or bug-hunt card not already queued (unseen first, else soonest due),
 *    unless one was already answered today.
 * 4. Say it out loud: one out-loud card, picked the same way.
 */
export function planToday({
  cards,
  states,
  now,
  dueBy = now,
  introducedToday,
  reviewedToday = new Set(),
  newPerDay = 5,
  maxReviews = 40,
}: PlanInput): PlannedItem[] {
  const ordered = [...cards].sort(byCurriculum);
  const queued = new Set<string>();
  const plan: PlannedItem[] = [];
  const add = (cardId: string, slot: Slot) => {
    queued.add(cardId);
    plan.push({ cardId, slot });
  };

  ordered
    .filter((c) => {
      const s = states.get(c.id);
      return s && s.due.getTime() <= (s.learning ? now : dueBy).getTime();
    })
    .sort((a, b) => states.get(a.id)!.due.getTime() - states.get(b.id)!.due.getTime())
    .slice(0, maxReviews)
    .forEach((c) => add(c.id, "review"));

  const budget = Math.max(0, newPerDay - introducedToday);
  ordered
    .filter((c) => !states.has(c.id) && NEW_TYPES.includes(c.type))
    .slice(0, budget)
    .forEach((c) => add(c.id, "new"));

  const pickOne = (types: CardType[], slot: Slot) => {
    const doneToday = cards.some((c) => types.includes(c.type) && reviewedToday.has(c.id));
    if (doneToday) return;
    const pool = ordered.filter((c) => types.includes(c.type) && !queued.has(c.id));
    const unseen = pool.find((c) => !states.has(c.id));
    const soonest = pool
      .filter((c) => states.has(c.id))
      .sort((a, b) => states.get(a.id)!.due.getTime() - states.get(b.id)!.due.getTime())[0];
    const pick = unseen ?? soonest;
    if (pick) add(pick.id, slot);
  };
  pickOne(DRILL, "drill");
  pickOne(["out-loud"], "out-loud");

  return plan;
}
