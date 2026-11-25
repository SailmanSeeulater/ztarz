---
title: "LIMIT 10 returns two rows"
module: ai
type: bug-hunt
source: "https://github.com/pgvector/pgvector#filtering"
tags: ["rag", "vector-database", "filtering"]
stack: ["pgvector", "postgresql"]
choices:
  - text: "`<=>` returns similarity, so the query needs `ORDER BY ... DESC`"
    why: "`<=>` is cosine distance: smaller means closer, so ascending order is right."
  - text: "The index uses `vector_cosine_ops` but the query needs `vector_l2_ops`"
    why: "`<=>` is the cosine operator, so the operator class matches and the index is used."
  - text: "Postgres applies `LIMIT` before `WHERE`"
    why: "SQL filters before it limits. The surprise comes from the approximate index, not from SQL order."
  - text: "HNSW is approximate: it returns about `hnsw.ef_search` (default 40) nearest candidates, and the `WHERE` filter runs after that, so only the few belonging to tenant 42 survive"
    correct: true
    why: "Turn on iterative index scans (`SET hnsw.iterative_scan = strict_order`) so it keeps scanning, or give each tenant its own partition or partial index. A B-tree on `tenant_id` with exact search also works when the filter matches few rows."
---

## Prompt

Tenant 42 owns about 5% of the rows, thousands of chunks. This query usually returns one to three rows, not ten. Why?

```sql
CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);

SELECT id, body
FROM chunks
WHERE tenant_id = 42
ORDER BY embedding <=> $1
LIMIT 10;
```

## Explanation

Without an index, pgvector does exact nearest-neighbour search. An approximate index trades some recall for speed, and filters are applied after the index scan. With a condition matching 5% of rows and 40 candidates, you get about two matches on average. A shared index also lets one tenant's vectors affect another tenant's recall, which is why the pgvector docs suggest partitioning for multitenancy.
