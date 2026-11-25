---
title: "A rate limit that lets 4x through"
module: swe
type: bug-hunt
source: "https://stripe.com/blog/rate-limiters"
tags: ["system-design", "rate-limiting", "scaling"]
stack: ["redis"]
choices:
  - text: "`Date.now()` drifts between instances, so windows reset early"
    why: "Clock skew is milliseconds. It can't turn a limit of 100 into a steady 400."
  - text: "The `Map` should be a `WeakMap` so old keys are cleaned up"
    why: "That's about memory, and `WeakMap` can't even take string keys. It doesn't change how many requests get through."
  - text: "Each instance counts in its own memory, so each allows 100; keep the counter in a shared store such as Redis so all instances see one count"
    correct: true
    why: "With four instances behind round robin, a client gets four separate buckets. Use an atomic `INCR` with an expiry, or a token bucket kept in Redis, so the check and the update happen in one step."
  - text: "Fixed windows let bursts through at the window boundary"
    why: "True, they allow up to 2x in a short burst across a boundary. That doesn't explain a steady 4x every minute."
---

## Prompt

The API promises 100 requests per minute per key. It runs as 4 instances behind a round-robin load balancer, and one customer gets about 400 a minute through. Why?

```ts
const hits = new Map<string, { count: number; resetAt: number }>();

export function allow(apiKey: string): boolean {
  const now = Date.now();
  const h = hits.get(apiKey);
  if (!h || now > h.resetAt) {
    hits.set(apiKey, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  return ++h.count <= 100;
}
```

## Explanation

State that has to be global can't live in one process once you scale out. Put the limiter's state in a store every instance shares, and make the read-and-update atomic, or two instances can both read 99 and both allow. Reject with `429 Too Many Requests` and a `Retry-After` header so well-behaved clients back off.
