---
title: "Should the web app and API share a monorepo?"
module: fullstack
type: out-loud
source: "https://en.wikipedia.org/wiki/Monorepo"
tags: ["monorepo", "tooling", "tradeoffs"]
stack: ["turborepo"]
---

## Prompt

Would you put the web app, the API and the shared types in one repository? What does it cost?

## Model answer

For a small team, usually yes. Shared code such as Zod schemas and types is imported directly instead of published as a package, and one commit can change the API and its callers together, so nothing is out of sync. Refactors are safer because you can see every user of a module.

The costs: everyone can read everything, which weakens least privilege; naive CI rebuilds and retests the whole repo on every change; and very large repos strain git. A build tool that understands the dependency graph, such as Turborepo, only runs tasks for packages that changed and caches the rest.
