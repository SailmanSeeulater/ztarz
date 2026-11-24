---
title: "What makes a component re-render"
module: frontend
type: mcq
source: "https://react.dev/learn/render-and-commit"
tags: ["react", "rendering"]
choices:
  - text: "Any local variable inside it changes"
    why: "Plain variables aren't tracked; changing one does nothing until something else triggers a render."
  - text: "Only when useEffect runs"
    why: "Effects run after a render; they don't cause one unless they set state."
  - text: "Its state changes, its parent re-renders, or a context it reads changes"
    correct: true
    why: "State, a parent re-render, or a consumed context value. \"Props changed\" really means the parent re-rendered."
  - text: "Only a change to its props"
    why: "Props only change because the parent re-rendered, and state and context changes also trigger renders."
---

## Prompt

Which of these causes a React component to re-render?
