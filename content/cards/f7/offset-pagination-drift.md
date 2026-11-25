---
title: "Offset pagination drifts"
module: f7
type: what-prints
source: "https://use-the-index-luke.com/no-offset"
tags: ["pagination", "sql", "performance"]
---

## Prompt

A feed shows 3 posts per page, newest first. Between the two requests, post 108 is published. What does page 2 return?

```sql
-- page 1: returns 107, 106, 105
SELECT id FROM posts ORDER BY id DESC LIMIT 3 OFFSET 0;

-- post 108 is inserted

-- page 2
SELECT id FROM posts ORDER BY id DESC LIMIT 3 OFFSET 3;
```

## Answer

105, 104, 103. Post 105 shows up twice.

## Explanation

`OFFSET` counts rows, so a new row at the top pushes everything down one place (a delete skips a row instead). It also gets slower with depth: `OFFSET 10000` still reads and throws away 10,000 rows.

Cursor (keyset) pagination remembers the last row seen: `WHERE id < 105 ORDER BY id DESC LIMIT 3` returns 104, 103, 102 and seeks straight there with the index, however deep the page. The cost: no jumping to page 37, and a non-unique sort column needs a tiebreaker, e.g. `WHERE (created_at, id) < ($1, $2)`.
