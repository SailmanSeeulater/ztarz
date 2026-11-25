---
title: "var in a loop with timers"
module: f4
type: what-prints
source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures"
tags: ["javascript", "closures", "scope"]
stack: ["javascript"]
---

## Prompt

What prints?

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

## Answer

3, 3, 3

## Explanation

`var` is function-scoped, so all three callbacks close over the same `i`, which is 3 by the time the timers run. With `let`, each iteration gets its own binding and it prints 0, 1, 2.
