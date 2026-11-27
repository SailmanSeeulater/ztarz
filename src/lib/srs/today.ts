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
  /**
   * Modules to draw new material from. Empty or missing means everything, in curriculum order.
   * Reviews ignore this: a card you've started always comes back when it's due.
   */
  focus?: ReadonlySet<string>;
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
  focus,
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

  const focused = focus && focus.size > 0 ? focus : null;
  const inFocus = (c: Card) => !focused || focused.has(c.module);

  const budget = Math.max(0, newPerDay - introducedToday);
  const unseenNew = ordered.filter((c) => !states.has(c.id) && NEW_TYPES.includes(c.type) && inFocus(c));
  // With a focus, take turns between the chosen modules so today mixes them (interleaving);
  // without one, walk the curriculum front to back.
  (focused ? roundRobin(unseenNew, (c) => c.module) : unseenNew).slice(0, budget).forEach((c) => add(c.id, "new"));

  const pickOne = (types: CardType[], slot: Slot) => {
    const doneToday = cards.some((c) => types.includes(c.type) && reviewedToday.has(c.id));
    if (doneToday) return;
    const pool = ordered.filter((c) => types.includes(c.type) && !queued.has(c.id));
    // Unseen cards come from the focus; if it has none left, fall back to practising a seen one.
    const unseen = pool.find((c) => !states.has(c.id) && inFocus(c));
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

/** a1 a2 b1 c1 c2 → a1 b1 c1 a2 c2: one from each group in turn, keeping each group's order. */
function roundRobin<T>(items: T[], key: (item: T) => string): T[] {
  const groups = new Map<string, T[]>();
  for (const it of items) groups.set(key(it), [...(groups.get(key(it)) ?? []), it]);
  const lists = [...groups.values()];
  const out: T[] = [];
  for (let i = 0; out.length < items.length; i++) for (const l of lists) if (i < l.length) out.push(l[i]);
  return out;
}
