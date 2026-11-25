---
title: "What error boundaries don't catch"
module: frontend
type: mcq
source: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
tags: ["react", "errors"]
stack: ["react"]
choices:
  - text: "Errors in event handlers and async code"
    correct: true
    why: "They catch errors thrown while rendering their subtree. Use try/catch in handlers."
  - text: "Errors in child components"
    why: "Children's render errors bubble up to the nearest boundary."
  - text: "Errors in lifecycle methods"
    why: "Lifecycle errors are caught too."
  - text: "Errors thrown during render"
    why: "That's exactly what they catch."
---

## Prompt

What do error boundaries NOT catch?
