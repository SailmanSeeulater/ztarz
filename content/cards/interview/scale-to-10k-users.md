---
title: "How would you scale this to 10,000 users?"
module: interview
type: out-loud
source: "https://github.com/SailmanSeeulater/ztarz/blob/main/compose.prod.yml"
tags: ["scaling", "system-design", "project"]
stack: ["postgresql", "docker"]
---

## Prompt

Your app has one user today. How would you scale it to 10,000?

## Model answer

**First, size it.** For a daily study app, 10,000 users is maybe a few hundred at once at peak and a handful of writes per user per day. That's small for Postgres, so I'd load-test the session and review endpoints and watch p95 latency, memory and database connections before buying anything.

**Where it is now.** One 1 GB VM: the app capped at 256 MB, Postgres at 128 MB with 20 connections. Card content is built into the image and nginx caches hashed assets, so the real load is the review write: one indexed row lock per answer.

**Then, in order:**

1. A bigger VM and Postgres tuned to it. Vertical scaling is cheap and simple.
2. Move Postgres to its own machine or a managed service with automated backups and point-in-time recovery.
3. Run two or more app containers behind nginx. The app is stateless and sessions live in the database, so a deploy or a crash no longer takes the site down.
4. Add a connection pooler such as PgBouncer once instances multiply, and a CDN for static files.

Monitoring and alerts come before all of it. For real users I'd also need open sign-up with email verification and rate limits on auth.

**Not yet:** Kubernetes, microservices or a cache layer. They add cost to run without fixing a problem I've measured.
