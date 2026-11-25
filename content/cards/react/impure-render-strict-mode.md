---
title: "Row numbers that skip in development"
module: react
type: bug-hunt
source: "https://react.dev/learn/keeping-components-pure"
tags: ["react", "purity", "strict-mode"]
stack: ["react"]
choices:
  - text: "Strict Mode is buggy; turn it off"
    why: "Strict Mode only exposes the bug. In production a re-render would still push again and the numbers would drift."
  - text: "The list needs keys"
    why: "Missing keys cause other problems, but they don't explain the doubled count."
  - text: "`Row` mutates a module-level array during render; Strict Mode renders twice in development, so each row pushes twice"
    correct: true
    why: "Render must be pure: same inputs, same output, no changes to outside variables. Compute the number from props, e.g. pass `index + 1` from the parent."
  - text: "`push` is asynchronous, so the length is read too early"
    why: "`Array.prototype.push` is synchronous."
---

## Prompt

In development, rows are numbered 2, 4, 6 instead of 1, 2, 3. Why?

```jsx
const rendered = [];

function Row({ item }) {
  rendered.push(item.id);
  return <li>{rendered.length}. {item.name}</li>;
}
```

## Explanation

React may call a component more than once and expects the same JSX each time. In development, Strict Mode calls component functions twice on purpose to surface exactly this kind of hidden side effect. Anything that writes to a variable declared outside the component during render is a bug waiting for a re-render.
