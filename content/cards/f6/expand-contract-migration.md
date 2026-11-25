---
title: "Renaming a column without downtime"
module: f6
type: out-loud
source: "https://martinfowler.com/bliki/ParallelChange.html"
tags: ["migrations", "deploys", "schema"]
---

## Prompt

You need to rename `users.fullname` to `users.display_name` on a live app running on several servers. How do you do it without downtime?

## Model answer

Not with one `RENAME COLUMN`: during the deploy, old servers are still running and would query a column that no longer exists. Instead, expand, migrate, then contract, so every step works with the code running next to it.

1. **Expand:** add `display_name`. Deploy code that writes both columns and still reads `fullname`.
2. **Backfill:** copy `fullname` into `display_name` in batches.
3. **Switch reads:** deploy code that reads `display_name`, still writing both.
4. **Contract:** once nothing reads `fullname`, stop writing it, then drop it in a later migration.

Any step can be rolled back on its own. The cost is several deploys and some duplicate data for a while. The same pattern works for changing a column's type or splitting a table.
