---
title: "Scaling out needs stateless servers"
module: swe
type: mcq
source: "https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/scale-out"
tags: ["system-design", "scaling", "sessions"]
choices:
  - text: "Turn on sticky sessions at the load balancer and stop there"
    why: "It hides the symptom, but stickiness limits scaling out: a heavy user can't be spread across instances, and a server that dies takes its users' sessions with it."
  - text: "Sessions live in each server's memory; move them to a shared store such as the database or Redis, or use signed tokens, so any instance can handle any request"
    correct: true
    why: "Horizontal scaling assumes any instance can serve any request. Keep state out of the process. Machine-specific keys for signing cookies cause the same bug, so share those too."
  - text: "The two servers' clocks differ, so session cookies expire early"
    why: "A few milliseconds of clock difference doesn't log people out at random. The second server simply has no record of the session."
  - text: "Replace both servers with one bigger machine"
    why: "Vertical scaling avoids the bug but has a ceiling and keeps a single point of failure. It doesn't fix the design."
---

## Prompt

You add a second app server behind the load balancer. Users now get logged out at random. What's the likely cause, and the fix that still lets you scale out?
