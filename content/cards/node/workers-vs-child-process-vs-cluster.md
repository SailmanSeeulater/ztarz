---
title: "worker_threads vs child_process vs cluster"
module: node
type: comparison
source: "https://nodejs.org/api/worker_threads.html"
tags: ["node", "concurrency", "workers", "processes"]
stack: ["nodedotjs"]
---

## What it is

Three ways to use more than one CPU core from Node. `worker_threads` runs JavaScript on extra threads inside one process. `child_process` starts a separate program (another Node script or any binary). `cluster` forks several copies of your server that share one listening port.

## How it models the problem

- **Workers:** each has its own V8 instance and event loop. They talk by message passing and can share memory with `SharedArrayBuffer` or transfer an `ArrayBuffer` without copying.
- **Child process:** fully separate memory. Talk over stdin/stdout or, with `fork()`, an IPC channel.
- **Cluster:** a primary process forks workers; incoming connections are spread across them.

## Where it shines

- Workers: CPU-heavy JavaScript (image resizing, parsing, hashing) without blocking the main event loop.
- Child process: running other tools (`ffmpeg`, `git`) or isolating risky code, since a crash can't take the parent down.
- Cluster: using every core for a stateless HTTP server on a single machine.

## Where it bites

- Workers don't help I/O-bound work; Node's async I/O already handles that. They also cost memory and start-up time, so use a pool.
- Child processes are heavier still, and every message is serialised.
- Cluster workers share nothing, so in-memory sessions or caches split across them. Many teams run one process per container and let the orchestrator scale instead.

## What interviewers ask

"Your API stalls while generating PDFs: what do you do?" Move the CPU work to a worker pool (or a separate job queue) so the event loop keeps serving requests, and explain why making functions `async` alone doesn't help.
