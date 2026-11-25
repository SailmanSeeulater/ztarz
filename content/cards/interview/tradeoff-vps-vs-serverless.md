---
title: "Tell me about a trade-off you made"
module: interview
type: out-loud
source: "https://github.com/SailmanSeeulater/ztarz/blob/main/docs/deploy.md"
tags: ["tradeoffs", "hosting", "serverless", "project"]
stack: ["docker"]
---

## Prompt

Tell me about a technical trade-off you made.

## Model answer

**The decision:** where to host ztarz. The options were serverless (a platform like Vercel, or SST on AWS, with a managed Postgres) or Docker Compose on the small VPS that already runs my other apps.

**I chose the VPS.** The app is one long-running Node server with a normal connection pool to an always-on Postgres, so there are no cold starts and no connection exhaustion to work around. The cost is flat. And I wanted to learn the operations side: nginx, TLS, deploys and backups.

**What I gave up:** autoscaling, preview deploys per pull request, and someone else doing the patching and backups. The box has 1 GB of RAM, so it can't even run `next build`.

**How I limited the risk:** builds run in GitHub Actions and the server only pulls images. Containers are memory-capped so one app can't starve the others. Every deploy is a pinned image SHA, so rollback is one line. Migrations are expand-then-contract, a health check also queries the database, and backups run nightly.

**When I'd switch:** if traffic became spiky, or a team needed preview environments, a managed or serverless platform would pay for itself.
