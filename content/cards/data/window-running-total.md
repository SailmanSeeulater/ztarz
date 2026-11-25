---
title: "Window functions keep the rows"
module: data
type: what-prints
source: "https://www.postgresql.org/docs/current/tutorial-window.html"
tags: ["sql", "window-functions", "analytics"]
stack: ["postgresql"]
---

## Prompt

What does this return?

```sql
-- orders: (a,1,10) (a,2,20) (a,3,30) (b,1,5) (b,2,15)
SELECT customer, day, amount,
       SUM(amount) OVER (PARTITION BY customer ORDER BY day) AS running
FROM orders
ORDER BY customer, day;
```

## Answer

```text
customer | day | amount | running
a        | 1   | 10     | 10
a        | 2   | 20     | 30
a        | 3   | 30     | 60
b        | 1   | 5      | 5
b        | 2   | 15     | 20
```

## Explanation

Unlike `GROUP BY`, a window function doesn't collapse rows: every row stays and gains a value computed over related rows. `PARTITION BY` restarts the calculation per customer. With `ORDER BY` inside `OVER`, the default frame runs from the start of the partition to the current row, which makes a running total. Window functions aren't allowed in `WHERE`; to filter on one, wrap the query in a subquery.
