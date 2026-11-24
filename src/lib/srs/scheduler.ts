import { DefaultScheduler, Rating } from "ts-fsrs";

// Thin wrapper over ts-fsrs v6 (FSRS-7 by default). Pure: no DB, no Next.

export type Scheduler = Awaited<ReturnType<typeof createScheduler>>;
export type SchedulerCard = ReturnType<Scheduler["newCard"]>;
export type RevLog = ReturnType<Scheduler["review"]>["revlog"];

export const RATINGS = ["again", "hard", "good", "easy"] as const;
export type RatingName = (typeof RATINGS)[number];

const GRADE = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
} as const;

const STATE_NAME = ["new", "learning", "review", "relearning"] as const;
export type StateName = (typeof STATE_NAME)[number];
export const stateName = (card: SchedulerCard): StateName => STATE_NAME[card.state];

const newCard = (scheduler: Scheduler, cardId: string, now: Date) =>
  scheduler.newCard({ now, cardId });

export function createScheduler(opts: { enableFuzz?: boolean } = {}) {
  return DefaultScheduler({ version: "FSRS-7", desiredRetention: 0.9, enableFuzz: opts.enableFuzz ?? true });
}

let shared: Promise<Scheduler> | undefined;
/** App-wide scheduler, created once. */
export const getScheduler = () => (shared ??= createScheduler());

/** The row shape card_state stores; `memory` is the scheduler card minus its dates. */
export type StoredCard = {
  due: Date;
  lastReview: Date | null;
  state: StateName;
  reps: number;
  lapses: number;
  memory: Record<string, unknown>;
};

export function toStored(card: SchedulerCard): StoredCard {
  const { dueAt, lastReviewAt, ...memory } = card;
  return {
    due: dueAt,
    lastReview: lastReviewAt ?? null,
    state: stateName(card),
    reps: card.reps,
    lapses: card.lapses,
    memory,
  };
}

export function fromStored(row: Pick<StoredCard, "due" | "lastReview" | "memory">): SchedulerCard {
  return { ...row.memory, dueAt: row.due, lastReviewAt: row.lastReview } as SchedulerCard;
}

/** Review a card (or a first sighting when `prev` is null). Never mutates input. */
export function review(
  scheduler: Scheduler,
  args: { cardId: string; prev: SchedulerCard | null; rating: RatingName; now: Date },
) {
  const card = args.prev ?? newCard(scheduler, args.cardId, args.now);
  return scheduler.review({ card, grade: GRADE[args.rating], now: args.now });
}

/** Human labels for when each rating would bring the card back, e.g. { good: "4d" }. */
export function previewIntervals(
  scheduler: Scheduler,
  args: { cardId: string; prev: SchedulerCard | null; now: Date },
): Record<RatingName, string> {
  const card = args.prev ?? newCard(scheduler, args.cardId, args.now);
  const out = {} as Record<RatingName, string>;
  for (const item of scheduler.preview({ card, now: args.now })) {
    const name = RATINGS[item.grade - 1];
    if (name) out[name] = formatInterval(item.card.dueAt.getTime() - args.now.getTime());
  }
  return out;
}

export function formatInterval(ms: number): string {
  const min = Math.max(1, Math.round(ms / 60_000));
  if (min < 60) return `${min}m`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h}h`;
  const d = Math.round(h / 24);
  if (d < 31) return `${d}d`;
  const mo = Math.round(d / 30.44);
  if (mo < 12) return `${mo}mo`;
  return `${(d / 365.25).toFixed(1).replace(/\.0$/, "")}y`;
}
