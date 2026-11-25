---
title: "Mutex vs semaphore"
module: os
type: comparison
source: "https://en.wikipedia.org/wiki/Semaphore_(programming)"
tags: ["concurrency", "locks", "synchronisation"]
---

## What it is

- **Mutex:** a lock. One holder at a time, and only the holder may unlock it.
- **Semaphore:** a counter with two atomic operations: wait (P, decrement, block at zero) and signal (V, increment, wake a waiter).

## How it models the problem

- **Mutex:** ownership. It protects a critical section: lock, touch shared state, unlock.
- **Semaphore:** counting. It tracks how many units of something are available, and any task may signal it, not just the one that waited.

## Where it shines

- **Mutex:** guarding shared data. Because it knows its owner, the system can apply priority inheritance (against priority inversion), report an error when a non-owner unlocks, and support recursive locking.
- **Semaphore:** limiting concurrency (at most N database connections) and signalling between tasks, like a producer telling a consumer that an item is ready.

## Where it bites

- **Mutex:** can't be used to signal another thread; unlocking from a different thread is an error or undefined.
- **Semaphore:** no owner, so nothing catches a stray extra signal, and a binary semaphore used as a lock loses the mutex's safety features.

## What interviewers ask

- *Is a binary semaphore the same as a mutex?* Same values, different rules: the mutex has an owner, the semaphore doesn't.
- *How would you cap concurrent downloads at 5?* A counting semaphore initialised to 5.
- *What's priority inversion?* A high-priority task waits on a lock held by a low-priority task that a medium-priority task keeps pre-empting.
