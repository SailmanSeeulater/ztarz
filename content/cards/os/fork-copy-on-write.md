---
title: "Why fork() of a big process is fast"
module: os
type: mcq
source: "https://man7.org/linux/man-pages/man2/fork.2.html"
tags: ["processes", "fork", "memory"]
stack: ["linux"]
choices:
  - text: "The child shares the parent's memory permanently, like a thread"
    why: "The child has its own address space. Its writes must not show up in the parent, so they can't share writable pages for good."
  - text: "The kernel copies memory in the background after fork returns"
    why: "There's no background copy. A page is copied only if one side writes to it."
  - text: "Pages are shared copy-on-write: fork duplicates only the page tables, and a page is copied the first time either process writes to it"
    correct: true
    why: "So the cost is page tables plus a task structure. A child that immediately calls `exec` never copies the data at all."
  - text: "fork only copies the memory the parent has touched recently"
    why: "Recency doesn't matter. Nothing is copied up front; writes after the fork trigger the copies."
---

## Prompt

A process using 4 GB of RAM calls `fork()`, and it returns in a fraction of a millisecond. How?
