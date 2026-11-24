---
title: "An async function starts synchronously"
module: f4
type: what-prints
source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function"
tags: ["javascript", "async"]
---

## Prompt

What prints, in order?

```js
async function load() {
  console.log(1);
  await null;
  console.log(2);
}
load();
console.log(3);
```

## Answer

1, 3, 2

## Explanation

An async function runs synchronously until its first `await`. The `await` suspends it and schedules the rest as a microtask, even when the awaited value isn't a promise, so the caller carries on first (3).
