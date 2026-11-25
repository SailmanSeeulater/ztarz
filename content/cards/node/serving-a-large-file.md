---
title: "Sending a 2 GB file"
module: node
type: mcq
source: "https://nodejs.org/api/fs.html#performance-considerations"
tags: ["node", "fs", "streams", "memory"]
stack: ["nodedotjs"]
choices:
  - text: "`await readFile(path)` from `node:fs/promises`, then `res.end(data)`"
    why: "It doesn't block, but it holds the whole file in memory per request. Ten downloads at once is 20 GB."
  - text: "`fs.readFileSync(path)`, because it's simpler"
    why: "Same memory problem, and it also blocks the event loop, so every other request waits."
  - text: "`fs.createReadStream(path)` piped to the response with `pipeline`"
    correct: true
    why: "The file goes out in small chunks with backpressure, so memory stays flat however big the file or the number of downloads."
  - text: "Read it with `readFile` once at startup and keep it in a variable"
    why: "Saves disk reads but pins 2 GB of memory for the life of the process."
---

## Prompt

An HTTP handler must send a 2 GB file to the client. Which approach scales?
