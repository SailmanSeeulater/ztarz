---
title: "The copy that eats all the memory"
module: node
type: bug-hunt
source: "https://nodejs.org/en/learn/modules/backpressuring-in-streams"
tags: ["node", "streams", "backpressure", "memory"]
stack: ["nodedotjs"]
choices:
  - text: "Raise `highWaterMark` on the read stream so it reads bigger chunks"
    why: "Bigger chunks mean fewer events, but the writer still can't keep up, so the queue still grows."
  - text: "It ignores backpressure: `write()` returns false when the destination is full, but reading never pauses. Use `pipeline()`"
    correct: true
    why: "`pipeline` from `node:stream/promises` pauses the source while the destination drains, passes errors along and destroys every stream on failure."
  - text: "Use `fs.readFile` and write the whole buffer at once"
    why: "That loads the entire file into memory up front, which is the problem you were trying to avoid."
  - text: "Wrap the handlers in an `async` function and `await` each `write`"
    why: "`write()` returns a boolean, not a promise, so there's nothing to await. You'd still need to wait for `'drain'`."
---

## Prompt

Copying a large log to a slow network share makes the process's memory climb until it crashes. What's wrong?

```js
import fs from "node:fs";

const src = fs.createReadStream("big.log");
const out = fs.createWriteStream("/mnt/share/big.log");

src.on("data", (chunk) => out.write(chunk));
src.on("end", () => out.end());
```

## Explanation

A readable stream produces data as fast as it can. When the writable's internal buffer passes its `highWaterMark`, `write()` returns `false`, which means "stop until I emit `'drain'`". This code never checks, so chunks pile up in memory.

```js
import { pipeline } from "node:stream/promises";

await pipeline(fs.createReadStream("big.log"), fs.createWriteStream("/mnt/share/big.log"));
```
