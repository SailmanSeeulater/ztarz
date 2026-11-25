---
title: "Memory keeps climbing"
module: node
type: out-loud
source: "https://nodejs.org/en/learn/diagnostics/memory"
tags: ["node", "memory", "debugging", "production"]
stack: ["nodedotjs"]
---

## Prompt

A Node service's memory grows steadily until the container is killed every few hours. How do you investigate?

## Model answer

First confirm it's a leak and not just a big working set: graph RSS and heap used over time. A leak climbs and never comes back down after garbage collection.

Then reproduce it, ideally locally under a load test, and take heap snapshots: one after warm-up, one after a lot of traffic. Chrome DevTools (via `--inspect`) or `--heapsnapshot-signal` give you them. Comparing the two shows which objects keep growing, and the retainers view shows what holds them.

The usual causes are an unbounded cache or `Map`, event listeners added per request and never removed, timers that are never cleared, and closures keeping large objects alive. I'd fix the root cause, for example a cache with a size limit and TTL, then rerun the load test to confirm memory levels off. Raising `--max-old-space-size` only delays the crash.
