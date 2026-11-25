---
title: "When a Redis cache fills up"
module: swe
type: mcq
source: "https://redis.io/docs/latest/develop/reference/eviction/"
tags: ["system-design", "caching", "eviction"]
stack: ["redis"]
choices:
  - text: "Commands that add data start returning errors; set `maxmemory-policy allkeys-lru` so the least recently used keys are evicted instead"
    correct: true
    why: "`noeviction` refuses writes once the limit is reached (reads still work). For a pure cache where some keys are much hotter than others, `allkeys-lru` is the usual choice."
  - text: "Redis evicts the oldest keys automatically, whatever the policy"
    why: "Eviction only happens under a policy that allows it. With `noeviction`, Redis returns an error on writes instead."
  - text: "Use `volatile-lru`, since it's the safest LRU option"
    why: "It only evicts keys that have a TTL. If most cache keys have none, it behaves like `noeviction` and writes still fail."
  - text: "Use `allkeys-random`, because true LRU costs too much CPU"
    why: "Redis approximates LRU by sampling a few keys, which is cheap. Random eviction only suits access spread evenly across all keys."
---

## Prompt

You use Redis purely as a cache with `maxmemory 2gb` and `maxmemory-policy noeviction`. Memory hits the limit. What happens, and what should you change?
