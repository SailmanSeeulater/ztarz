---
title: "Threads, processes or asyncio"
module: python
type: comparison
source: "https://docs.python.org/3/library/threading.html"
tags: ["python", "concurrency", "gil", "asyncio"]
stack: ["python"]
---

## What it is

Three ways to do more than one thing at once in Python: `threading` (several OS threads in one process), `multiprocessing` or `ProcessPoolExecutor` (several processes), and `asyncio` (one thread running many tasks that take turns at each `await`).

## How it models the problem

In standard CPython the global interpreter lock (GIL) lets only one thread execute Python bytecode at a time. Threads still overlap while waiting, because the GIL is released during I/O. Processes each have their own interpreter and GIL, so they run Python code on several cores at once. Asyncio never runs two things at the same instant; it switches tasks whenever one awaits.

## Where it shines

- **Threads:** many I/O-bound jobs (HTTP calls, file or database waits) using blocking libraries.
- **Processes:** CPU-bound pure-Python work like parsing or number crunching across cores.
- **Asyncio:** thousands of concurrent network connections with low overhead per task.

## Where it bites

- Threads don't speed up CPU-bound Python code, and shared state still needs locks.
- Processes cost more to start, and data passed between them must be pickled and copied.
- Asyncio needs async-aware libraries all the way down; one blocking call stalls every task.
- Free-threaded CPython builds without the GIL exist since 3.13, but they're not the default.

## What interviewers ask

"Why didn't adding threads make my CPU-heavy script faster?" Because of the GIL: use processes for CPU-bound work, threads or asyncio for I/O-bound work.
