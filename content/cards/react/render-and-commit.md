---
title: "Render phase vs commit phase"
module: react
type: concept
source: "https://react.dev/learn/render-and-commit"
tags: ["react", "rendering"]
stack: ["react"]
---

## Prompt

What happens between a `setState` call and the pixels changing, and why does it matter that "rendering" doesn't mean "updating the DOM"?

## Answer

1. **Trigger:** the initial mount or a state update queues a render.
2. **Render:** React calls your component functions to work out what the UI should look like, and compares the result with the previous render.
3. **Commit:** React applies only the differences to the DOM. If nothing changed, it touches nothing.

Then the browser paints. Because render can run without a commit (and may run more than once), component bodies must be pure: no DOM writes, requests or mutations there. Side effects belong in event handlers or effects, which run after commit.
