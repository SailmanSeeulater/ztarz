---
title: "The N+1 problem"
module: f6
type: mcq
source: "https://orm.drizzle.team/docs/rqb"
tags: ["sql", "performance", "orm"]
choices:
  - text: "Too many indexes"
    why: "Indexes slow writes but don't multiply queries."
  - text: "A caching bug"
    why: "It's a query-pattern problem; caching only hides it."
  - text: "Off-by-one pagination"
    why: "That's a pagination bug, unrelated."
  - text: "One query for a list, then one more query per row"
    correct: true
    why: "Fix it with a join, a relational query (`with` in Drizzle, `include` in Prisma), or batching."
---

## Prompt

What's the N+1 problem?
