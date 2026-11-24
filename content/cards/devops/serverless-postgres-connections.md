---
title: "Serverless + Postgres risk"
module: devops
type: mcq
source: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html"
tags: ["serverless", "postgres", "aws"]
choices:
  - text: "Connection exhaustion, because every function instance opens its own connection"
    correct: true
    why: "Put a pooler in front, such as RDS Proxy or PgBouncer."
  - text: "Postgres can't run in AWS"
    why: "RDS and Aurora run Postgres."
  - text: "Lambdas can't use TypeScript"
    why: "Node.js Lambdas run compiled TypeScript fine."
  - text: "Transactions are impossible"
    why: "Transactions work within one connection."
---

## Prompt

Main database risk with serverless (Lambda) + Postgres?
