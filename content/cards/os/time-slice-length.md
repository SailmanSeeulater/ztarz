---
title: "Choosing the round-robin time slice"
module: os
type: mcq
source: "https://en.wikipedia.org/wiki/Scheduling_(computing)"
tags: ["scheduling", "round-robin"]
choices:
  - text: "Shorter is always better: every task gets the CPU sooner"
    why: "Response time improves, but each slice ends in a context switch, so very short slices spend a growing share of CPU time on switching instead of work."
  - text: "Very short slices make the system feel responsive but waste CPU on switching; very long slices cut overhead but make it behave like first-come, first-served"
    correct: true
    why: "That's the trade-off. Real schedulers pick slices of a few milliseconds, long compared with a switch but short compared with human reaction time."
  - text: "The slice length only matters on single-core machines"
    why: "Each core runs its own run queue and still switches between the tasks on it, so the trade-off applies per core."
  - text: "Longer slices starve short jobs completely"
    why: "Short jobs still run once the queue reaches them; they just wait longer. Round robin doesn't starve anyone."
---

## Prompt

A round-robin scheduler gives each ready task a fixed time slice, then moves it to the back of the queue. What's the trade-off in choosing the slice length?
