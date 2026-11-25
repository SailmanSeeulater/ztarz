---
title: "Virtual threads"
module: java
type: out-loud
source: "https://openjdk.org/jeps/444"
tags: ["java", "concurrency", "virtual-threads"]
stack: ["java"]
---

## Prompt

What are virtual threads, what problem do they solve, and when don't they help?

## Model answer

A platform thread is a thin wrapper over an OS thread, which is expensive, so a server handling one request per thread runs out of threads long before it runs out of CPU. The workaround was asynchronous code, which scales but is hard to write, read and debug.

A virtual thread is a lightweight thread managed by the JVM. Many virtual threads run on a small number of OS carrier threads; when one blocks on I/O, the JVM unmounts it and the carrier runs another. So you can write plain blocking, thread-per-request code and still have millions of concurrent tasks.

Two rules follow. They're cheap, so don't pool them: create one per task, for example with `Executors.newVirtualThreadPerTaskExecutor()`. And they're not faster threads: they add throughput for workloads that spend most of their time waiting, not for CPU-bound work.
