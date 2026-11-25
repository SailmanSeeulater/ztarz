---
title: "Why serverless exhausts Postgres connections"
module: f6
type: out-loud
source: "https://www.pgbouncer.org/features.html"
tags: ["postgres", "serverless", "connections", "pooling"]
stack: ["postgresql"]
---

## Prompt

Your API runs on serverless functions. Under load, Postgres starts refusing connections with "too many clients". Explain why, and what a connection pooler does about it.

## Model answer

Each function instance is a separate process with its own database client, so each opens its own connection. A traffic spike means hundreds of instances at once, and warm idle ones keep their connections open. Postgres has a fixed limit, `max_connections`, so you hit it long before the database runs out of CPU.

A pooler such as PgBouncer sits in between. Functions connect to it, and it shares a small, fixed set of real connections among them. In **transaction mode**, a real connection is lent to a client for one transaction and then returned, so a thousand clients can share twenty connections.

The catch: nothing tied to a session survives between transactions. Session-level `SET`, `LISTEN`, session advisory locks and SQL `PREPARE` don't work, so the driver must not rely on them. Also create the client outside the handler so warm invocations reuse it.
