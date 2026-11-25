---
title: "Idempotency keys"
module: f7
type: mcq
source: "https://docs.stripe.com/api/idempotent_requests"
tags: ["http", "idempotency", "payments", "retries"]
stack: ["stripe"]
choices:
  - text: "The client generates a fresh key for each attempt, so the server can tell attempts apart"
    why: "A new key looks like a new request, so the retry charges again. Generate one key per operation and reuse it on every retry."
  - text: "The server rejects every later request that carries the same key"
    why: "A bare rejection leaves the client unsure whether the charge happened. Replaying the saved response tells it."
  - text: "The server saves the first result under the key and returns that same response to any retry with the key"
    correct: true
    why: "Stripe saves the status code and body once the endpoint starts executing, and errors if a retry reuses the key with different parameters. Use a random key such as a UUID v4."
  - text: "The header turns the POST into a PUT, which is idempotent"
    why: "The method doesn't change. The server deduplicates by key."
---

## Prompt

A client sends `POST /v1/charges`. The connection drops before the response arrives, so it retries. How does an `Idempotency-Key` header stop a double charge?
