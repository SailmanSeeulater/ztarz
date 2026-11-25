---
title: "Why put work in a background job"
module: backend
type: out-loud
source: "https://docs.bullmq.io/guide/retrying-failing-jobs"
tags: ["queues", "background-jobs", "reliability"]
stack: ["bullmq", "redis"]
---

## Prompt

On sign-up you send a welcome email and resize the avatar. Why move that into a background job, and what do you have to design for?

## Model answer

**Why:** the request returns in milliseconds instead of waiting on a slow email provider. A failure gets retried instead of becoming a 500 for the user. Workers scale separately from the web servers, and a burst of sign-ups queues up instead of overloading anything.

**Design for:**

- **Retries with backoff:** in BullMQ, `attempts: 5` with `backoff: { type: "exponential", delay: 1000 }` retries after roughly 1, 2, 4 and 8 seconds.
- **Running twice:** a worker can crash after sending the email but before marking the job done, and then it runs again. Delivery is at least once, so the job must be idempotent: check a "sent" flag or use a unique key.
- **Giving up:** after the last attempt the job lands in the failed set (a dead-letter queue elsewhere). Alert on it and make re-running easy.
- **Small payloads:** pass ids, not whole records, and reload fresh data in the worker.

The same shape works in Celery or SQS; only the names change.
