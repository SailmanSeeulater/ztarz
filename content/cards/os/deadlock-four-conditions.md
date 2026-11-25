---
title: "The four conditions for deadlock"
module: os
type: out-loud
source: "https://en.wikipedia.org/wiki/Deadlock_(computer_science)"
tags: ["concurrency", "deadlock", "locks"]
---

## Prompt

Two threads each hold one lock and wait for the other's. Explain the conditions that make deadlock possible, and how you'd prevent it in real code.

## Model answer

Deadlock needs all four of the Coffman conditions at once:

1. **Mutual exclusion:** the resource can only be held by one thread at a time.
2. **Hold and wait:** a thread holds one resource while waiting for another.
3. **No preemption:** a resource can't be taken away; the holder must release it.
4. **Circular wait:** a cycle of threads, each waiting on a resource the next one holds.

Break any one and deadlock can't happen. In practice:

- **Lock ordering** breaks circular wait: every thread takes locks A then B, never B then A. If there's no natural order, order by an ID or address.
- **Try-lock with timeout** breaks hold-and-wait: if you can't get the second lock, release the first and retry.
- **Hold fewer locks:** keep critical sections small and avoid calling out to unknown code while holding one.

Databases do the detection version: they spot the cycle and abort one transaction.
