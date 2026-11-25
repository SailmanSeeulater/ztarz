---
title: "When an index helps"
module: f6
type: mcq
source: "https://www.postgresql.org/docs/current/indexes-ordering.html"
tags: ["sql", "indexes", "performance"]
stack: ["postgresql"]
choices:
  - text: "`SELECT * FROM orders WHERE created_at > '2000-01-01'` (matches almost every row)"
    why: "When most of the table matches, reading it sequentially is cheaper than jumping between the index and the table for each row. The planner will usually ignore the index."
  - text: "`SELECT * FROM orders ORDER BY created_at DESC LIMIT 20`"
    correct: true
    why: "The index is already in `created_at` order, so Postgres reads the first 20 entries and stops. Without it, it must sort every row to find those 20."
  - text: "`SELECT * FROM orders WHERE date(created_at) = '2026-11-25'`"
    why: "The index stores `created_at`, not `date(created_at)`, so it can't be used for that condition. Write it as a range instead: `created_at >= '2026-11-25' AND created_at < '2026-11-26'`."
  - text: "`SELECT * FROM orders ORDER BY created_at` (the whole table)"
    why: "To return every row, a sequential scan plus an explicit sort is usually faster than walking the index, because it reads the table in order on disk."
---

## Prompt

`orders` has millions of rows and a B-tree index on `created_at`. Which query is the index most likely to speed up?
