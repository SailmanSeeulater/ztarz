---
title: "Promise vs setTimeout ordering"
module: f4
type: what-prints
source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model"
tags: ["javascript", "event-loop"]
---

## Prompt

What prints, in order?

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
```

## Answer

A, D, C, B

## Explanation

Synchronous code runs first (A, D). Then the microtask queue is drained completely (promise callbacks: C) before the event loop picks the next task (the timer: B). `setTimeout(fn, 0)` means "no sooner than the next task", never "now".
