---
title: "Why hooks can't go in an if"
module: frontend
type: mcq
source: "https://react.dev/reference/rules/rules-of-hooks"
tags: ["react", "hooks"]
choices:
  - text: "React identifies hooks by the order they're called, which must be the same every render"
    correct: true
    why: "Top level only: never in loops, conditions, or after an early return."
  - text: "Conditions run before render"
    why: "Conditions run during render, like everything else in the component body."
  - text: "Hooks are async"
    why: "Hooks run synchronously during render."
  - text: "It's only a lint style rule"
    why: "The lint rule enforces a real runtime requirement; breaking it mixes up state between hooks."
---

## Prompt

Why can't you call a hook inside an `if`?
