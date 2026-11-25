---
title: "Minor vs major page faults"
module: os
type: concept
source: "https://en.wikipedia.org/wiki/Page_fault"
tags: ["memory", "paging", "performance"]
---

## Prompt

What's the difference between a minor and a major page fault, and which one should worry you on a busy server?

## Answer

A page fault is the CPU trapping to the kernel because a page isn't mapped for the access being made.

- **Minor (soft):** the page is already in RAM, just not mapped for this process yet, for example a shared library page another process loaded. The kernel updates the page table and returns. Cheap.
- **Major (hard):** the page isn't in RAM. The kernel must read it from disk (a file or swap), possibly evicting another page first. That adds storage latency to the faulting thread, hundreds of times slower than a memory access even on an SSD.

A steady stream of major faults means the working set doesn't fit in RAM, and the box is heading towards thrashing.
