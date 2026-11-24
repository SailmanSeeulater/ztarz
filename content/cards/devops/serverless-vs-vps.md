---
title: "Serverless vs a VPS"
module: devops
type: out-loud
source: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html"
tags: ["serverless", "hosting", "tradeoffs"]
---

## Prompt

Explain the tradeoffs of serverless (like SST on AWS) versus a VPS running Docker Compose.

## Model answer

- **Serverless:** no servers to patch, scales to zero, pay per request, a stage per PR. Costs: cold starts, no long-lived connections, and Postgres connection exhaustion, fixed with a pooler such as RDS Proxy or PgBouncer.
- **VPS:** one box with Docker Compose and nginx, persistent connections and predictable cost, but you patch it, back it up, and it doesn't autoscale.
