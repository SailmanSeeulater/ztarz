---
title: "process.exit(1) vs process.exitCode = 1"
module: node
type: concept
source: "https://nodejs.org/api/process.html#processexitcode"
tags: ["node", "process", "cli"]
stack: ["nodedotjs"]
---

## Prompt

A CLI script ends with `console.log(report); process.exit(1);` and the report is sometimes cut off when piped to a file. Why, and what's the better way to signal failure?

## Answer

`process.exit()` ends the process as soon as possible, even if asynchronous work is still pending, including writes to `stdout` that haven't flushed yet. So piped output can be truncated.

Set `process.exitCode = 1` instead and let the script finish naturally. Node exits with that code once the event loop is empty.

Exit codes are how shells and CI read the result: `0` means success, anything else is failure (Node itself uses `1` for an uncaught exception).
