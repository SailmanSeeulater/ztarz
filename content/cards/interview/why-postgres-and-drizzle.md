---
title: "Why Postgres and Drizzle?"
module: interview
type: out-loud
source: "https://github.com/SailmanSeeulater/ztarz/blob/main/src/db/schema.ts"
tags: ["databases", "orm", "tradeoffs", "project"]
stack: ["postgresql", "drizzle"]
---

## Prompt

Why did you choose Postgres and Drizzle for this project?

## Model answer

**Postgres**, because the data is relational and correctness matters more than scale.

- Progress is one row per user per card, with a composite primary key and an index on user and due date, so "what's due today?" is an index range scan.
- A review must count exactly once. Recording one runs in a transaction that locks the card's row with `SELECT ... FOR UPDATE`, and inserts the log with `ON CONFLICT DO NOTHING` on a client-generated id, so a retried request can't count twice.
- `jsonb` stores the scheduler's full state next to queryable columns like `due`, so a newer FSRS model doesn't need a migration for every new field.
- It's boring in the good sense: the same Postgres 18 locally, in CI and in production, and `pg_dump` for backups.

**Drizzle**, because the schema is plain TypeScript and the types come straight from it, with no codegen step to forget. Queries read like SQL, so I can predict what runs. `drizzle-kit` generates SQL migrations I can read and review, and Better Auth has a Drizzle adapter, so the auth tables live in the same schema.

**Trade-off:** Prisma's relation queries are more ergonomic, and Drizzle expects you to know SQL. For a small app where I care about the exact queries, that's the side I want.
