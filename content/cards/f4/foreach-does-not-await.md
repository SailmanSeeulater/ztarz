---
title: "forEach doesn't wait"
module: f4
type: what-prints
source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach"
tags: ["javascript", "async"]
---

## Prompt

What prints, in order?

```js
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  [30, 10, 20].forEach(async (ms) => {
    await sleep(ms);
    console.log(ms);
  });
  console.log("done");
}
main();
```

## Answer

done, 10, 20, 30

## Explanation

`forEach` ignores the promises its callback returns, so nothing waits: "done" prints immediately, then each callback logs when its timer fires. To go one at a time, use `for (const ms of list) { await sleep(ms); ... }`, which prints 30, 10, 20, done. To run them in parallel and wait for all, use `await Promise.all(list.map(async (ms) => ...))`.
