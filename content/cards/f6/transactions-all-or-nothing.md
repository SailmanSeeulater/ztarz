---
title: "What a transaction protects against"
module: f6
type: concept
source: "https://www.postgresql.org/docs/current/tutorial-transactions.html"
tags: ["sql", "transactions"]
---

## Prompt

What does wrapping this transfer in `BEGIN` / `COMMIT` protect against?

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

## Answer

- **All or nothing.** If the second update fails, or the server crashes between the two, neither change is kept. Money is never debited without being credited.
- **No half-finished state is visible.** Other sessions see the balances from before or after the transfer, never in between.
- **Durability.** Once `COMMIT` returns, the change survives a crash.
- **Changing your mind.** `ROLLBACK` discards everything since `BEGIN`.

Without `BEGIN`, each statement commits on its own. What a transaction does not do by itself is stop two transfers reading the same balance at once and both deciding there's enough money. That needs a row lock or a conditional update.
