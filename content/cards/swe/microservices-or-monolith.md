---
title: "Should we split into microservices?"
module: swe
type: out-loud
source: "https://martinfowler.com/articles/microservice-trade-offs.html"
tags: ["system-design", "microservices", "architecture"]
---

## Prompt

Your team of six wants to split its monolith into microservices. What do you say?

## Model answer

**First, what problem are we solving?** Microservices buy three things: module boundaries that are hard to cross, independent deployment, and freedom to pick different technology per service. They mostly pay off when several teams keep blocking each other in one codebase. Six people on one product rarely have that problem.

**What they cost:**

- **Distribution.** Function calls become network calls that are slower and can fail, so every call needs timeouts, retries and a plan for partial failure.
- **Eventual consistency.** Each service owns its data, so one database transaction no longer covers a business operation.
- **Operations.** More deploy pipelines, monitoring, tracing and on-call surface. You need solid automation before you start.

**The trap is a distributed monolith:** services that share a database or must be deployed together. You get all the costs above and none of the independence.

**What I'd propose:** keep one deployable, but enforce module boundaries inside it (separate packages, no reaching into another module's tables). If one part later needs to scale or ship on its own schedule, extract that module along a boundary we've already proven.
