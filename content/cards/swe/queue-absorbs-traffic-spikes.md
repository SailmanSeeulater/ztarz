---
title: "A queue to absorb a traffic spike"
module: swe
type: mcq
source: "https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling"
tags: ["system-design", "queues", "scaling"]
choices:
  - text: "It makes the fulfilment service process each order faster"
    why: "Each order takes as long as before. The queue changes when the work happens, not how long it takes."
  - text: "The API enqueues orders quickly and fulfilment drains them at its own steady rate, so you size it for average load, not the peak; it can't help if arrivals stay above the drain rate for good, and callers no longer get the result immediately"
    correct: true
    why: "That's queue-based load leveling. Watch queue depth: if it keeps growing, add consumers or shed load. Return `202 Accepted` and report the outcome later."
  - text: "It guarantees each order is processed exactly once"
    why: "Most queues deliver at least once, so a message can arrive twice. Consumers still need to be idempotent."
  - text: "It keeps orders in strict arrival order, even with many workers"
    why: "Parallel consumers finish out of order. Strict ordering needs partitions or sessions, which limits parallelism."
---

## Prompt

A flash sale sends 5,000 orders a second for two minutes. The fulfilment service handles 500 a second and falls over. What does putting a queue between the API and fulfilment buy you?
