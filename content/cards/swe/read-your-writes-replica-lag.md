---
title: "Saved, but the old value comes back"
module: swe
type: bug-hunt
source: "https://www.postgresql.org/docs/current/warm-standby.html#STREAMING-REPLICATION"
tags: ["system-design", "replication", "consistency"]
stack: ["postgresql"]
choices:
  - text: "The `UPDATE` isn't wrapped in a transaction, so it hasn't committed yet"
    why: "A single statement commits on its own when it finishes. The write is durable on the primary by the time the next line runs."
  - text: "Streaming replication is asynchronous, so the replica may not have applied the update yet when the read hits it"
    correct: true
    why: "That's replication lag breaking read-your-writes. Read a user's own data from the primary for a short window after they write, or use `UPDATE ... RETURNING` and skip the second read."
  - text: "The connection pool is returning a cached result for the same query"
    why: "Postgres and ordinary pools don't cache query results. The replica returns what it has, which is the old row."
  - text: "The browser cached the old profile response"
    why: "The stale value comes back in the response to the save itself, which this code builds from the replica. No browser cache is involved."
---

## Prompt

After saving a new display name, users sometimes see the old one. A refresh a moment later shows the new name. What's wrong?

```ts
// writes go to the primary, reads to a replica
await primary.query(
  "UPDATE users SET display_name = $1 WHERE id = $2",
  [name, userId],
);
const { rows } = await replica.query(
  "SELECT * FROM users WHERE id = $1",
  [userId],
);
return rows[0];
```

## Explanation

With leader-follower replication, writes go to the leader and stream to followers. In Postgres this is asynchronous by default, so there's a short delay, usually under a second, before a committed change is visible on a standby. Most reads can tolerate that. A user reading back their own change can't, so route those reads to the primary. Synchronous replication removes the lag but slows every commit.
