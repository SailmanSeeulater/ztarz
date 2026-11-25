---
title: "What a context switch costs"
module: os
type: out-loud
source: "https://en.wikipedia.org/wiki/Context_switch"
tags: ["scheduling", "performance", "processes"]
---

## Prompt

What happens during a context switch, and why does it cost more than just "saving some registers"?

## Model answer

A context switch is the kernel stopping one task and resuming another on the same CPU, triggered by a timer interrupt, a blocking system call or a higher-priority task waking up.

1. **Save:** the kernel stores the outgoing task's CPU state (registers, stack pointer, program counter) in its control block.
2. **Pick:** the scheduler chooses the next task to run.
3. **Restore:** it loads that task's saved state and, if it's a different process, switches to its page tables.

The direct cost is running the scheduler and copying state. The bigger cost is indirect: switching address spaces can mean flushing the TLB, so the new task's first memory accesses miss, and the CPU caches are now full of the previous task's data. Switching between threads of the same process is cheaper because they share the same memory map, so no TLB flush is needed.

That's why thousands of busy threads can spend a real share of CPU time switching rather than working.
