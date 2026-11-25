---
title: "When useCallback actually helps"
module: react
type: mcq
source: "https://react.dev/reference/react/useCallback"
tags: ["react", "performance", "memoization"]
stack: ["react"]
choices:
  - text: "Always: it makes the function run faster"
    why: "It doesn't speed up the function at all. It only returns the same function object between renders."
  - text: "When the function is passed to a child wrapped in `memo`, or used as a dependency of another hook"
    correct: true
    why: "Then a stable reference lets `memo` skip the child's re-render, or stops an effect re-running. Elsewhere it adds cost for nothing."
  - text: "Whenever the component has more than one event handler"
    why: "The number of handlers is irrelevant; what matters is who receives the function."
  - text: "When passing the function to a plain DOM element like `<button onClick>`"
    why: "DOM elements don't skip re-renders based on prop identity, so there's no gain."
---

## Prompt

`const onSave = useCallback(() => save(draft), [draft])`. When is the `useCallback` worth having?
