---
title: "Interrupts vs polling"
module: embedded
type: concept
source: "https://en.wikipedia.org/wiki/Polling_(computer_science)"
tags: ["interrupts", "polling", "io"]
---

## Prompt

What's the difference between polling a device and using an interrupt, and when is polling the right choice?

## Answer

- **Polling:** the CPU repeatedly checks a status bit ("is data ready?"). Simple, but cycles spent checking are wasted, and an event that comes and goes between checks can be missed.
- **Interrupts:** the device signals the CPU when it needs attention. The CPU stops what it's doing, runs an interrupt service routine, and returns. No wasted checks, and low latency.

Polling is fine when the system has nothing else to do until the device is ready, when events are frequent and predictable, or when the check is cheap and the loop is fast anyway. Interrupts win when events are rare or urgent, or when the CPU should sleep in between.
