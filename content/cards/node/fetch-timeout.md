---
title: "Putting a timeout on fetch"
module: node
type: concept
source: "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static"
tags: ["node", "fetch", "timeouts", "http"]
stack: ["nodedotjs"]
---

## Prompt

Your Node service calls a partner API with the built-in `fetch`. How do you stop a hung request from holding your handler open?

## Answer

`fetch` has no `timeout` option. Pass a signal that aborts after a deadline:

```js
try {
  const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
} catch (err) {
  if (err.name === "TimeoutError") {
    // the partner took longer than 5 s: fail fast, retry or degrade
  }
  throw err;
}
```

`AbortSignal.timeout(ms)` rejects the fetch with a `TimeoutError` (a user calling `controller.abort()` gives `AbortError` instead), so you can tell the two apart.
