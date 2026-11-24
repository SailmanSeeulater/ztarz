---
title: "useRef vs useState"
module: frontend
type: mcq
source: "https://react.dev/reference/react/useRef"
tags: ["react", "hooks"]
choices:
  - text: "Refs can't hold objects"
    why: "A ref's `.current` can hold any value."
  - text: "State persists across renders and refs don't"
    why: "Both persist; that's the point of each."
  - text: "Refs only work in class components"
    why: "`useRef` is a hook for function components."
  - text: "Changing a ref does not trigger a re-render"
    correct: true
    why: "Both persist across renders. Use refs for DOM nodes, timer ids and values the UI doesn't show."
---

## Prompt

Main difference between `useRef` and `useState`?
