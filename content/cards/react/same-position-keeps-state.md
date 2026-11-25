---
title: "The counter that survives a re-style"
module: react
type: what-prints
source: "https://react.dev/learn/preserving-and-resetting-state#same-component-at-the-same-position-preserves-state"
tags: ["react", "state", "reconciliation"]
stack: ["react"]
---

## Prompt

`Counter` keeps its own `count` state. The user clicks it to 3, then ticks the checkbox that flips `compact`. What does the counter show?

```jsx
return compact ? <Counter size="small" /> : <Counter size="large" />;
```

## Answer

3

## Explanation

React matches state to a component's position in the tree, not to the JSX line that produced it. Both branches render a `Counter` in the same spot, so React treats it as the same component and only updates its props. Different types at that spot, or a different `key`, would reset it.
