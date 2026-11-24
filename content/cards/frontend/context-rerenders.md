---
title: "The performance catch with Context"
module: frontend
type: mcq
source: "https://react.dev/reference/react/useContext"
tags: ["react", "context", "performance"]
choices:
  - text: "Context disables memoization"
    why: "Memoized children still re-render only if they read the context."
  - text: "Context values can't be objects"
    why: "They can be anything; a new object each render is the problem."
  - text: "Context only works one level deep"
    why: "Any descendant can read it, however deep."
  - text: "Every consumer re-renders when the provided value changes"
    correct: true
    why: "Split contexts, memoize the value object, or use a selector-based store for data that changes often."
---

## Prompt

What's the performance catch with Context?
