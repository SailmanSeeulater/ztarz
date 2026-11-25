---
title: "What belongs in environment config"
module: fullstack
type: concept
source: "https://12factor.net/config"
tags: ["config", "environments", "deployment"]
---

## Prompt

What should live in environment config rather than code, and how do you check you've separated them?

## Answer

Anything that changes between deploys: database URLs, credentials for third-party services, per-environment values such as the public hostname. Internal wiring that's the same everywhere, like routes, stays in code.

The test: could you make the repository public right now without leaking a single credential? Put config in environment variables so the same build runs in staging and production with different values. Validate them at startup, for example with a schema over `process.env`, so a missing variable stops the boot instead of failing the first real request.
