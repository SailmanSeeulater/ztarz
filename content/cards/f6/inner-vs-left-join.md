---
title: "Inner join vs left join"
module: f6
type: what-prints
source: "https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN"
tags: ["sql", "joins"]
---

## Prompt

How many rows does each query return, and which are they?

```text
users            orders
id | name        id | user_id | total
---+------       ---+---------+------
 1 | Ana         10 |       1 |    20
 2 | Ben         11 |       1 |    35
 3 | Cy          12 |       2 |    15
```

```sql
-- A
SELECT u.name, o.total FROM users u JOIN orders o ON o.user_id = u.id;
-- B
SELECT u.name, o.total FROM users u LEFT JOIN orders o ON o.user_id = u.id;
```

## Answer

- A: 3 rows. Ana 20, Ana 35, Ben 15.
- B: 4 rows. The same three, plus Cy with `total` NULL.

## Explanation

An inner join keeps only pairs that match. A left join keeps every left row at least once, filling the right side's columns with NULL when nothing matches. Either way, a row appears once per match, which is why Ana shows up twice. Watch out: `WHERE o.total > 10` on a left join drops Cy again, because NULL fails the test; put that condition in the `ON` clause to keep unmatched users.
