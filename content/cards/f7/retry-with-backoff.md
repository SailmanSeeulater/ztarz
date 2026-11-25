---
title: "What to retry, and how"
module: f7
type: mcq
source: "https://docs.cloud.google.com/storage/docs/retry-strategy"
tags: ["http", "retries", "reliability"]
choices:
  - text: "Any non-2xx response"
    why: "A 400 or 403 fails the same way every time. Retrying it just adds load."
  - text: "4xx responses, because the client can correct them on the next attempt"
    why: "A retry sends the same request, so nothing has been corrected."
  - text: "Only 5xx; a 429 means give up"
    why: "429 is rate limiting, which is temporary: wait, then try again."
  - text: "408, 429, 5xx and network errors such as timeouts; not other 4xx"
    correct: true
    why: "Those are transient, so the same request may succeed later. Other 4xx need a fix first. Only retry a non-idempotent request, like a POST, if it carries an idempotency key."
---

## Prompt

Your API client retries failed calls with exponential backoff and jitter. Which failures should it retry?

## Notes

Backoff: wait longer after each failure (1 s, 2 s, 4 s, ...) up to a cap, and give up after a few attempts. Jitter adds a random amount to each wait, so thousands of clients that failed together don't all retry at the same instant and knock the service over again.
