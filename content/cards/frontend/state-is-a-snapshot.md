---
title: "Reading state right after setting it"
module: frontend
type: mcq
source: "https://react.dev/learn/state-as-a-snapshot"
tags: ["react", "state"]
stack: ["react"]
choices:
  - text: "`undefined`"
    why: "`count` still holds this render's value; nothing clears it."
  - text: "The old value"
    correct: true
    why: "State is a snapshot for this render. The update applies on the next render, so `count` is unchanged here."
  - text: "The new value"
    why: "Setting state doesn't change the variable you already have; it schedules a re-render."
  - text: "A Promise"
    why: "State setters return nothing and aren't async functions."
---

## Prompt

After `setCount(count + 1)`, what does `console.log(count)` on the next line print?
