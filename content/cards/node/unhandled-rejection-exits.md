---
title: "A rejected promise nobody catches"
module: node
type: mcq
source: "https://nodejs.org/api/cli.html#--unhandled-rejectionsmode"
tags: ["node", "promises", "errors"]
stack: ["nodedotjs"]
choices:
  - text: "Node prints a deprecation warning and keeps running"
    why: "That was the behaviour of old Node versions. The default mode now is `throw`."
  - text: "The rejection is silently dropped"
    why: "Node tracks rejections that have no handler by the end of the current turn and reports them."
  - text: "The process waits until a `.catch` is attached later"
    why: "It doesn't wait. If no handler exists when Node checks, the rejection is treated as unhandled."
  - text: "It's raised as an uncaught exception, so the process exits with code 1 unless an `unhandledRejection` handler deals with it"
    correct: true
    why: "Under the default `--unhandled-rejections=throw` mode, a forgotten `await` or `.catch` on a failing call crashes the server. Fix the missing handling rather than swallowing the event globally."
---

## Prompt

In current Node, a request handler calls `saveAudit(event)` without `await` or `.catch`, and the call rejects. What happens by default?
