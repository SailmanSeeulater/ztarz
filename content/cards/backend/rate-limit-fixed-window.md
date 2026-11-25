---
title: "The hole in a fixed window rate limit"
module: backend
type: mcq
source: "https://redis.io/learn/howtos/ratelimiting"
tags: ["rate-limiting", "http", "api"]
stack: ["redis"]
choices:
  - text: "Nothing beyond 10; fixed windows are exact"
    why: "Each window is counted separately, so the limit holds per window, not over every 10-second span."
  - text: "Up to 20 requests in about 2 seconds, by sending 10 just before a window ends and 10 just after"
    correct: true
    why: "The boundary burst. A sliding window counter smooths it; a token bucket allows bursts only up to its capacity. Rejected requests get `429 Too Many Requests` with `Retry-After`."
  - text: "Exactly one request per second, never a burst"
    why: "That's a leaky bucket's steady drain, not a fixed window."
  - text: "Unlimited requests once the counter key expires"
    why: "Expiry just starts the next window with a fresh count of zero."
---

## Prompt

You limit each client to 10 requests per 10 seconds with a fixed window counter (`INCR` on a key per window, with an expiry). What can a client get away with?
