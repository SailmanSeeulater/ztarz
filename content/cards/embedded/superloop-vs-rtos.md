---
title: "Superloop vs RTOS"
module: embedded
type: comparison
source: "https://en.wikipedia.org/wiki/Embedded_system"
tags: ["rtos", "architecture", "scheduling"]
---

## What it is

- **Superloop (bare metal):** one endless loop that calls each job in turn: read sensors, update outputs, handle comms. Arduino's `loop()` is one. Interrupts handle urgent events and often set flags for the loop.
- **RTOS:** a small kernel that switches between tasks, usually pre-emptively by priority, driven by a timer interrupt.

## How it models the problem

- **Superloop:** each job must return quickly. One slow job delays everything else, because nothing can interrupt it except an ISR.
- **RTOS:** each job is a task with its own stack that can block (wait on a queue, a semaphore or a delay) while others run. The kernel decides who runs next.

## Where it shines

- **Superloop:** tiny, easy to reason about and debug, no kernel overhead. Plenty for simple devices.
- **RTOS:** many independent activities with different deadlines (radio stack, display, sensor sampling) without hand-writing a state machine for each.

## Where it bites

- **Superloop:** worst-case response time grows with every job you add, and long operations must be split by hand.
- **RTOS:** shared data now needs synchronisation (queues, mutexes), and new failure modes appear: race conditions, deadlock, stack overflow per task, priority inversion.

## What interviewers ask

- *When would you move to an RTOS?* When the loop can no longer meet its deadlines, or the code turns into tangled state machines.
- *How do an ISR and a task share data in an RTOS?* The ISR posts to a queue or gives a semaphore; the task blocks on it.
- *Why not just use Linux?* Linux isn't hard real-time and needs far more memory than a microcontroller has.
