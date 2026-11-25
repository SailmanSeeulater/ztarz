---
title: "The lost update"
module: f6
type: bug-hunt
source: "https://www.postgresql.org/docs/current/transaction-iso.html#XACT-READ-COMMITTED"
tags: ["sql", "transactions", "concurrency", "locking"]
stack: ["postgresql"]
choices:
  - text: "The transaction isn't atomic"
    why: "Each transaction is atomic. The problem is that both read the old balance before either wrote."
  - text: "Postgres cached the first `SELECT` result"
    why: "Postgres has no query-result cache. Each `SELECT` reads committed data; both genuinely saw 100."
  - text: "Only `SERIALIZABLE` can prevent this"
    why: "Serializable would catch it by aborting one transaction, which you must then retry. Under the default Read Committed, a row lock or a conditional update fixes it."
  - text: "Both read 100 before either writes, so the second `UPDATE` overwrites the first"
    correct: true
    why: "Lock the row when reading with `SELECT ... FOR UPDATE`, or do the check and the write in one statement: `UPDATE accounts SET balance = balance - 30 WHERE id = 1 AND balance >= 30`."
---

## Prompt

Two requests withdraw 30 from the same account at the same moment. The balance starts at 100. Sometimes it ends at 70 instead of 40. Why?

```sql
-- each request runs this
BEGIN;
SELECT balance FROM accounts WHERE id = 1;     -- both see 100
-- app checks 100 >= 30, computes 100 - 30
UPDATE accounts SET balance = 70 WHERE id = 1;
COMMIT;
```

## Explanation

With `FOR UPDATE`, the second transaction's `SELECT` waits until the first commits, then returns the new balance (70). The conditional `UPDATE` works because Postgres, after waiting for the other writer, re-checks the `WHERE` clause against the newly committed row. Check the affected row count to know whether the withdrawal happened.
