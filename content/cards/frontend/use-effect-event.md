---
title: "What useEffectEvent is for"
module: frontend
type: mcq
source: "https://react.dev/reference/react/useEffectEvent"
tags: ["react", "useEffect", "closures"]
choices:
  - text: "Reading the latest props or state inside an effect without adding them to its dependencies"
    correct: true
    why: "The event function always sees fresh values, and the effect re-runs only for its real dependencies."
  - text: "Running effects on the server"
    why: "Effects never run on the server."
  - text: "Batching state updates"
    why: "React 18+ batches automatically."
  - text: "Replacing `useState`"
    why: "It doesn't hold state."
---

## Prompt

`useEffectEvent` (React 19.2) solves which problem?
