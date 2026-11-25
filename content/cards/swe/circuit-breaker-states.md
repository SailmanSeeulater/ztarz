---
title: "What an open circuit breaker does"
module: swe
type: mcq
source: "https://martinfowler.com/bliki/CircuitBreaker.html"
tags: ["system-design", "resilience", "reliability"]
choices:
  - text: "Retries each call with exponential backoff until the provider answers"
    why: "That's a retry policy. Against a provider that's down, retries add load and keep your threads waiting."
  - text: "Queues the calls and replays them when the provider recovers"
    why: "A breaker doesn't store calls. Replaying a backlog of payments later would be a separate, risky design."
  - text: "Fails calls immediately without contacting the provider; after a reset timeout it lets one trial call through (half-open) and closes again if it succeeds"
    correct: true
    why: "Failing fast frees your threads and gives the struggling provider room to recover. A failed trial call reopens the breaker and restarts the timer."
  - text: "Switches traffic to a backup payment provider by itself"
    why: "You can run a fallback when the breaker is open, but that's your code. The breaker itself only decides whether the call is attempted."
---

## Prompt

A payment provider starts hanging, and your checkout threads pile up behind 30-second timeouts until the whole site stalls. You add a circuit breaker that trips after repeated failures. What does it do while it's open?

## Notes

Closed: calls pass through and failures are counted. Open: calls fail at once. Half-open: one trial call decides whether to close or reopen. Alert when a breaker trips, since it means a dependency is down.
