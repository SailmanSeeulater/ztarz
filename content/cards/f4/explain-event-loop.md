---
title: "The event loop in a minute"
module: f4
type: out-loud
source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model"
tags: ["javascript", "event-loop"]
stack: ["javascript"]
---

## Prompt

Explain the JavaScript event loop in about a minute.

## Model answer

JavaScript runs on one thread with one call stack. The event loop takes a task (the script, a timer callback, a network response, a click), runs it to completion, then drains the **microtask queue** (promise callbacks, code after an `await`, `queueMicrotask`) completely. The browser may then render, and the loop takes the next task.

Consequences: synchronous code runs first, then microtasks, then timers. A long synchronous loop blocks everything, clicks and rendering included. Node uses the same model, with its own phases for timers, I/O and `setImmediate`; CPU-heavy work belongs in a worker thread.
