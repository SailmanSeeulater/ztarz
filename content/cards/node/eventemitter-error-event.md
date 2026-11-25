---
title: "An 'error' event nobody listens to"
module: node
type: mcq
source: "https://nodejs.org/api/events.html#error-events"
tags: ["node", "events", "errors"]
stack: ["nodedotjs"]
choices:
  - text: "Nothing: an event with no listeners is ignored"
    why: "True for ordinary events (`emit` returns false), but `'error'` is special."
  - text: "Node logs a warning and carries on"
    why: "Warnings are for things like too many listeners. An unhandled `'error'` is fatal."
  - text: "The error is thrown, and if nothing catches it the process crashes"
    correct: true
    why: "Always attach an `'error'` listener to emitters you create or receive, such as streams, sockets and child processes."
  - text: "The emitter retries the event once a listener is added"
    why: "Emitters don't queue events. A listener added later never sees an earlier emit."
---

## Prompt

What happens when an `EventEmitter` emits `'error'` and no `'error'` listener is registered?
