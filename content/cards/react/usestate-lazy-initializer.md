---
title: "useState(fn()) vs useState(fn)"
module: react
type: concept
source: "https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state"
tags: ["react", "hooks", "performance"]
stack: ["react"]
---

## Prompt

What's the difference between `useState(parseDraft(saved))` and `useState(() => parseDraft(saved))`?

## Answer

React only uses the initial value on the first render, but `useState(parseDraft(saved))` still calls `parseDraft` on every render and throws the result away.

Passing a function, `useState(() => parseDraft(saved))` or `useState(parseDraft)` when it takes no arguments, makes it an initializer: React calls it once, during the first render. Use it when building the initial state is expensive, such as parsing large JSON or reading storage.
