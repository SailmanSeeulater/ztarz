---
title: "Rolling, blue-green and canary deploys"
module: devops
type: out-loud
source: "https://sre.google/workbook/canarying-releases/"
tags: ["deployment", "rollback", "reliability"]
---

## Prompt

Explain rolling, blue-green and canary deployments, and when you'd pick each.

## Model answer

- **Rolling:** replace instances a few at a time until all run the new version. No extra capacity needed and it's the Kubernetes Deployment default, but old and new versions serve together for a while, and rolling back is another rollout.
- **Blue-green:** run the new version as a full second environment, test it, then switch the router. Cutover and rollback are a single switch. It costs double capacity during the release, and the database must work with both versions.
- **Canary:** send a small slice of real traffic, say 5%, to the new version and compare its error rate and latency with the rest. Widen if it holds, pull it if it doesn't. It catches what tests miss with a small blast radius, but needs good metrics and traffic splitting.

I'd use rolling by default, blue-green when I need an instant switch back, and canary for risky changes to high-traffic services. All three need backward-compatible schema changes, because two versions touch the database at once.
