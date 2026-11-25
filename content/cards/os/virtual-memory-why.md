---
title: "What virtual memory buys you"
module: os
type: mcq
source: "https://docs.kernel.org/admin-guide/mm/concepts.html"
tags: ["memory", "paging", "virtual-memory"]
stack: ["linux"]
choices:
  - text: "It makes RAM faster by caching it on disk"
    why: "Disk is far slower than RAM. Swapping pages out lets you use more memory, it never speeds RAM up."
  - text: "It's only there so you can use swap when RAM runs out"
    why: "Swap is one use. Isolation, demand paging and sharing matter even on machines with no swap at all."
  - text: "Each process sees its own address space; the CPU translates every address through page tables, so the kernel can isolate processes, load pages on demand and share pages between them"
    correct: true
    why: "Translation happens per page. The kernel controls the page tables, so it decides what each process can see and when a page is really backed by RAM."
  - text: "It lets a process address more memory than the CPU's word size allows"
    why: "The virtual address width is still set by the architecture. Virtual memory doesn't widen pointers."
---

## Prompt

Every memory access a process makes uses a virtual address. What does that indirection give the operating system?
