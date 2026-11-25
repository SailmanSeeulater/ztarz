---
title: "A spike every time the cache expires"
module: swe
type: bug-hunt
source: "https://en.wikipedia.org/wiki/Cache_stampede"
tags: ["system-design", "caching", "reliability"]
stack: ["redis"]
choices:
  - text: "Redis is evicting the key under memory pressure"
    why: "The spikes line up with the 60-second TTL, not with memory. The key is expiring exactly as written."
  - text: "`JSON.parse` on a large payload is blocking the event loop"
    why: "That would slow every cache hit evenly. It doesn't explain a database spike once a minute."
  - text: "The TTL is too short; set it to an hour"
    why: "A longer TTL makes the spikes rarer, not smaller. When the key does expire, the same flood hits the database."
  - text: "When the key expires, every request in the next 3 seconds misses and runs `buildHomepage` at once: thousands of identical heavy queries"
    correct: true
    why: "That's a cache stampede. Let one request rebuild under a lock (`SET key NX`) while others serve the stale copy, refresh the value in the background before it expires, or have each reader refresh early with a small probability."
---

## Prompt

The homepage gets 2,000 requests a second. Once a minute the database CPU hits 100% for a few seconds and requests time out. What's wrong?

```ts
async function getHomepage() {
  const cached = await redis.get("homepage");
  if (cached) return JSON.parse(cached);

  const data = await buildHomepage(); // ~3 s of heavy queries
  await redis.set("homepage", JSON.stringify(data), { EX: 60 });
  return data;
}
```

## Explanation

Cache-aside protects the database only while the key exists. For a hot key, the gap between expiry and the first rebuild finishing is long enough for thousands of requests to miss together. The extra load can slow the rebuild further, so the hit rate can stay at zero. The fix is to make sure only one caller recomputes a hot key, or to recompute before anyone sees a miss.
