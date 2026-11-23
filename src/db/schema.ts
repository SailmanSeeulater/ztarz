import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// Content stays in git (content/cards/**.md); these tables hold only progress.

export const cardStateEnum = pgEnum("card_state_kind", [
  "new",
  "learning",
  "review",
  "relearning",
]);
export const ratingEnum = pgEnum("rating", ["again", "hard", "good", "easy"]);
export const labStatusEnum = pgEnum("lab_status", ["started", "passed", "failed"]);

export const cardState = pgTable(
  "card_state",
  {
    userId: text().notNull(),
    cardId: text().notNull(), // = content file slug, e.g. "frontend/stale-closure-interval"
    due: timestamp({ withTimezone: true }).notNull(),
    stability: real().notNull(), // FSRS memory state
    difficulty: real().notNull(),
    scheduledDays: integer().notNull().default(0),
    learningSteps: integer().notNull().default(0),
    reps: integer().notNull().default(0),
    lapses: integer().notNull().default(0),
    state: cardStateEnum().notNull().default("new"),
    lastReview: timestamp({ withTimezone: true }),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.cardId] }),
    // Makes "what's due today?" an index range scan.
    index().on(t.userId, t.due),
  ],
);

export const reviewLog = pgTable(
  "review_log",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: text().notNull(),
    cardId: text().notNull(),
    rating: ratingEnum().notNull(),
    correct: boolean(), // set for auto-graded types (mcq, what-prints, bug-hunt)
    reviewedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index().on(t.userId, t.reviewedAt)],
);

export const labAttempt = pgTable("lab_attempt", {
  id: uuid().primaryKey().defaultRandom(),
  userId: text().notNull(),
  labId: text().notNull(),
  status: labStatusEnum().notNull(),
  evidence: jsonb(), // what the verify check saw
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
