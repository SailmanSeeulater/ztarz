---
title: "A true statement about Drizzle"
module: stack
type: mcq
source: "https://orm.drizzle.team/docs/overview"
tags: ["drizzle", "orm"]
stack: ["drizzle"]
choices:
  - text: "It only supports MongoDB"
    why: "Drizzle targets SQL databases: Postgres, MySQL, SQLite and others."
  - text: "It needs `prisma generate`"
    why: "That's Prisma's codegen step."
  - text: "The schema is written in TypeScript and there's no codegen step"
    correct: true
    why: "Types are inferred straight from the TS schema. It's light, which helps serverless cold starts."
  - text: "It has its own schema language"
    why: "That's Prisma (`schema.prisma`)."
---

## Prompt

Drizzle versus Prisma: which is true of Drizzle?
