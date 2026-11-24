# ztarz

[![CI](https://github.com/SailmanSeeulater/ztarz/actions/workflows/ci.yml/badge.svg)](https://github.com/SailmanSeeulater/ztarz/actions/workflows/ci.yml)

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

Sign in at `/sign-in`; `/` is today's session. `pnpm build` fails on any invalid card.

## Tests

- `pnpm test`: unit tests (Vitest) for the scheduler, planner and card parser.
- `pnpm test:e2e`: Playwright signs in and completes today's session against a production build. It uses its own `ztarz_e2e` database in the dev Postgres container (created, migrated and wiped on every run) and a test-only account, so your real review history is never touched. Needs `pnpm db:up` first; run `pnpm exec playwright install chromium` once.

GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) runs both on every push to main and every pull request: lint, unit tests and the build in one job, and the Playwright test against a Postgres service container in another. Traces from failed e2e runs are uploaded as an artifact.

Set `APP_TIMEZONE` (e.g. `America/New_York`) on a server whose clock isn't in your timezone; it decides when "today" starts.

## Writing cards

One card = one Markdown file in `content/cards/<module>/<slug>.md`. The path (minus `.md`) is the card id that review history keys on, so **renaming a file resets its history**.

```md
---
title: The interval counter that stops at 1
module: frontend          # f1–f11, frontend, backend, devops, ai, stack, interview
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

### Private cards

`content/private/` is gitignored. Cards there get ids starting `private/`, may cite `source: notes:<file>` instead of a URL, and are only scheduled in your signed-in session. They never appear in the library or on public card pages. Personal interview answers live here.

## Layout

- `content/cards/`: the cards (source of truth for content); `content/private/`: your gitignored private deck
- `scripts/build-content.ts`: validates cards with Zod, writes `src/generated/cards.json`
- `src/lib/content/`: card schema, parser, loader
- `src/lib/srs/`: FSRS scheduling (ts-fsrs, FSRS-7), the daily planner, day boundaries. Pure and unit-tested.
- `src/server/`: data access (`srs.ts`) and tRPC routers (`session.today`, `session.progress`, `review.record`)
- `src/db/`: Drizzle schema (Better Auth tables + `card_state`, `review_log`, `lab_attempt`); migrations in `drizzle/`
- `e2e/`: Playwright test, its setup, and the e2e database and server settings
- `src/app/`: pages (`/` today, `/map`, `/library`, `/cards/...`, `/sign-in`) and the auth, tRPC and `/api/health` route handlers
- `Dockerfile`, `compose.prod.yml`, `deploy/`: production image, nginx with Let's Encrypt; runbook in [docs/deploy.md](docs/deploy.md)

## How a day is planned

1. **Reviews:** every card due today, oldest first. Cards in learning steps (minutes apart) wait until their step is up.
2. **New:** up to 5 unseen concept, multiple-choice or comparison cards a day, foundations first.
3. **Drill:** one what-prints or bug-hunt card, once a day.
4. **Say it out loud:** one out-loud card, once a day.

A wrong auto-graded answer is always rated Again. Cards rescheduled within 30 minutes come back in the same session. `review.record` is idempotent on a client-generated `reviewId`, so a retried request never counts twice.

## Curriculum map

`/map` shows every module with its progress: cards started, cards mature (scheduled 21+ days out), and cards due. Each role branch lists its prerequisite foundations and how much of them is mature.

## Deploy

Docker Compose on one VPS: Postgres, the app (Next.js standalone output), nginx terminating TLS, certbot renewing. Step by step in [docs/deploy.md](docs/deploy.md).

## Status

Weeks 1–4 of the plan: card pipeline, library, sign-in (single owner), FSRS scheduling, the Today session, the Bask prep imported (60 cards plus a private interview deck), the curriculum map, a production deploy setup, 10 cards each for F1–F4, and a Playwright test that completes a session. 107 public cards.

From here, per the plan: do one session every day and fix whatever annoys you. The VPS deploy itself is still to do; see [docs/deploy.md](docs/deploy.md).
