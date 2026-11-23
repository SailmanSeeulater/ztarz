# ztarz

A daily 20-minute gym for developers: a foundations trunk every engineer needs, then role branches (frontend, backend, DevOps, AI) and stack comparisons, with spaced repetition (FSRS) so nothing fades.

Lessons link out (roadmap.sh, Full Stack Open, docs). ztarz owns the **practice**: cards, drills, labs.

## Run it

```bash
pnpm install
cp .env.example .env
pnpm db:up          # Postgres 18 in Docker on :5433
pnpm db:migrate
pnpm dev            # builds the card index, then starts Next.js on :3000
```

`pnpm test` runs the loader tests. `pnpm build` fails on any invalid card.

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
- `src/db/schema.ts`: progress tables (`card_state`, `review_log`, `lab_attempt`); migrations in `drizzle/`
- `src/app/`: Next.js App Router pages

## Status

Week 1 skeleton from the plan, minus auth: the library, a card page for every card type, the Postgres schema and migrations, and 7 seed cards.
Next (week 2): Better Auth (single user), tRPC `review.record` running ts-fsrs, and the Today page.
