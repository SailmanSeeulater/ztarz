# ztarz

A daily 20-minute gym for developers: a foundations trunk every engineer needs, then role branches (frontend, backend, DevOps, AI) and stack comparisons, with spaced repetition (FSRS) so nothing fades.

Lessons link out (roadmap.sh, Full Stack Open, docs). ztarz owns the **practice**: cards, drills, labs.

## Run it

```bash
pnpm install
cp .env.example .env  # then fill in BETTER_AUTH_SECRET and the OWNER_* values
pnpm db:up            # Postgres 18 in Docker on :5433
pnpm db:migrate
pnpm owner:create     # creates the single account (public sign-up is off)
pnpm dev              # builds the card index, then starts Next.js on :3000
```

Sign in at `/sign-in`; `/` is today's session. `pnpm test` runs the unit tests. `pnpm build` fails on any invalid card.

Set `APP_TIMEZONE` (e.g. `America/New_York`) on a server whose clock isn't in your timezone; it decides when "today" starts.

## Writing cards

One card = one Markdown file in `content/cards/<module>/<slug>.md`. The path (minus `.md`) is the card id that review history keys on, so **renaming a file resets its history**.

```md
---
title: The interval counter that stops at 1
module: frontend          # f1–f11, frontend, backend, devops, ai, stack
type: what-prints         # concept | mcq | what-prints | bug-hunt | comparison | out-loud
source: https://react.dev/...   # required: no source, no card
tags: [react, hooks]
---

## Prompt
...
## Answer
...
## Explanation
...
```

Required `## ` sections per type:

| Type | Sections | Front-matter |
| --- | --- | --- |
| `concept` | Prompt, Answer | |
| `mcq` | Prompt | `choices: [{ text, correct, why }]`, exactly one correct |
| `what-prints` | Prompt, Answer, Explanation | |
| `bug-hunt` | Prompt, Explanation | `choices` as above |
| `comparison` | What it is, How it models the problem, Where it shines, Where it bites, What interviewers ask | |
| `out-loud` | Prompt, Model answer | |

Extra sections (e.g. `## Notes`) are allowed and shown after the answer.

## Layout

- `content/cards/`: the cards (source of truth for content)
- `scripts/build-content.ts`: validates cards with Zod, writes `src/generated/cards.json`
- `src/lib/content/`: card schema, parser, loader
- `src/lib/srs/`: FSRS scheduling (ts-fsrs, FSRS-7), the daily planner, day boundaries. Pure and unit-tested.
- `src/server/`: data access (`srs.ts`) and tRPC routers (`session.today`, `review.record`)
- `src/db/`: Drizzle schema (Better Auth tables + `card_state`, `review_log`, `lab_attempt`); migrations in `drizzle/`
- `src/app/`: pages (`/` today, `/library`, `/cards/...`, `/sign-in`) and the auth and tRPC route handlers

## How a day is planned

1. **Reviews:** every card due today, oldest first. Cards in learning steps (minutes apart) wait until their step is up.
2. **New:** up to 5 unseen concept, multiple-choice or comparison cards a day, foundations first.
3. **Drill:** one what-prints or bug-hunt card, once a day.
4. **Say it out loud:** one out-loud card, once a day.

A wrong auto-graded answer is always rated Again. Cards rescheduled within 30 minutes come back in the same session. `review.record` is idempotent on a client-generated `reviewId`, so a retried request never counts twice.

## Status

Weeks 1 and 2 of the plan: card pipeline, library, sign-in (single owner), FSRS scheduling, and the Today session.
Next (week 3): import the Bask prep as cards, a curriculum map with progress per module, and deploy to the VPS with HTTPS.
