---
title: "Reading EXPLAIN ANALYZE"
module: f6
type: mcq
source: "https://www.postgresql.org/docs/current/using-explain.html#USING-EXPLAIN-ANALYZE"
tags: ["sql", "performance", "explain"]
stack: ["postgresql"]
choices:
  - text: "The query took 1,834 ms"
    why: "`cost` is in arbitrary planner units, not milliseconds. The real time is `actual time`: about 19 ms."
  - text: "An index on `status` would fix it"
    why: "About half the table matches, and for that many rows a Seq Scan is the right plan. Indexes pay off when few rows are fetched."
  - text: "The planner expected 5 rows and got 48,210, so its statistics are off; run `ANALYZE orders` and re-check"
    correct: true
    why: "Estimated vs actual rows is the first thing to compare. A large gap means the planner chose a plan for data that doesn't exist, which can lead to bad join choices further up the tree."
  - text: "Nothing ran; `EXPLAIN ANALYZE` only estimates"
    why: "`ANALYZE` executes the statement for real. To analyse an `UPDATE` or `DELETE` safely, wrap it in `BEGIN; ... ROLLBACK;`."
---

## Prompt

What's the most useful thing this plan tells you?

```text
Seq Scan on orders  (cost=0.00..1834.00 rows=5 width=40)
                    (actual time=0.020..19.110 rows=48210 loops=1)
  Filter: (status = 'pending'::text)
  Rows Removed by Filter: 51790
```
