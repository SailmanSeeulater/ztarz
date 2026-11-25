---
title: "nextTick, a promise and setImmediate"
module: node
type: what-prints
source: "https://nodejs.org/api/process.html#processnexttickcallback-args"
tags: ["node", "event-loop", "async"]
stack: ["nodedotjs"]
---

## Prompt

What prints when this runs as a CommonJS file (`order.cjs`)?

```js
setImmediate(() => console.log("immediate"));
Promise.resolve().then(() => console.log("promise"));
process.nextTick(() => console.log("tick"));
console.log("sync");
```

## Answer

sync, tick, promise, immediate

## Explanation

After the synchronous code, Node drains the `process.nextTick` queue, then the promise microtask queue. `setImmediate` callbacks run later, in the event loop's check phase. In an ES module the order of the middle two flips (promise, then tick), because the module itself is evaluated inside a promise job and that microtask queue drains first. Prefer `queueMicrotask` when you need predictable ordering.
