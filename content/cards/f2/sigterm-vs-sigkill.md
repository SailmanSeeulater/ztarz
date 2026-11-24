---
title: "SIGTERM vs SIGKILL"
module: f2
type: concept
source: "https://man7.org/linux/man-pages/man7/signal.7.html"
tags: ["linux", "processes", "signals"]
---

## Prompt

SIGTERM vs SIGKILL: what's the difference, and why does it matter for deploys?

## Answer

- **SIGTERM** (15, what `kill <pid>` sends by default) *asks* the process to stop. It can catch it, finish in-flight requests, close database connections, and exit cleanly.
- **SIGKILL** (9, `kill -9`) can't be caught or ignored: the kernel ends the process immediately, mid-write if need be.

`docker stop` sends SIGTERM, waits 10 seconds, then sends SIGKILL. So a server should handle SIGTERM and finish shutting down within that grace period. Use `-9` only when TERM didn't work.
