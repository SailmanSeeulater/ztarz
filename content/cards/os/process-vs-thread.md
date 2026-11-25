---
title: "Processes vs threads"
module: os
type: comparison
source: "https://man7.org/linux/man-pages/man7/pthreads.7.html"
tags: ["processes", "threads", "concurrency"]
stack: ["linux"]
---

## What it is

- **Process:** a running program with its own address space, open files and process ID.
- **Thread:** a line of execution inside a process. A process can hold many threads, all running the same program.

## How it models the problem

- **Processes** are isolated: one can't read another's memory without explicit sharing (pipes, sockets, shared memory).
- **Threads** share the process's global memory (data and heap), open file descriptors, current directory and signal dispositions. Each thread has its own stack, thread ID, signal mask and `errno`.

## Where it shines

- **Processes:** isolation. A crash or memory corruption in one worker can't touch the others' memory.
- **Threads:** cheap communication through shared memory, and switching between threads of one process skips the address-space change.

## Where it bites

- **Processes:** heavier to create and to switch between; sharing data means serialising it through IPC.
- **Threads:** shared memory means data races. One thread corrupting memory corrupts it for all of them.

## What interviewers ask

- *What do threads share and what is per-thread?* Heap, globals and file descriptors are shared; stack, registers, thread ID and `errno` are per-thread.
- *Why is a thread switch cheaper than a process switch?* Threads share virtual memory, so the page tables and TLB contents can stay.
- *When would you pick processes anyway?* When a fault in one unit of work must not corrupt the others.
