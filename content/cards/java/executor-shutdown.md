---
title: "The program that never exits"
module: java
type: mcq
source: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ExecutorService.html"
tags: ["java", "concurrency", "threads"]
stack: ["java"]
choices:
  - text: "The tasks are deadlocked waiting on each other"
    why: "All the tasks finished and printed their results; what's left is the idle pool."
  - text: "`main` must call `System.exit(0)` at the end of every Java program"
    why: "A Java program exits normally once only daemon threads remain. `System.exit` would hide the real problem."
  - text: "The pool's worker threads are still alive waiting for more work; call `shutdown()` (or use the executor in try-with-resources, which closes it) when you're done"
    correct: true
    why: "An unused `ExecutorService` should be shut down. `shutdown()` lets submitted tasks finish and then stops the threads."
  - text: "`submit` runs tasks on the main thread, which then blocks"
    why: "`submit` hands the task to the pool's threads and returns a `Future` straight away."
---

## Prompt

`main` submits ten tasks to `Executors.newFixedThreadPool(4)`, every result prints, and then the process just sits there. Why?
