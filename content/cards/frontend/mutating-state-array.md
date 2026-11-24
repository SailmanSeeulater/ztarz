---
title: "The list that won't update"
module: frontend
type: bug-hunt
source: "https://react.dev/learn/updating-arrays-in-state"
tags: ["react", "state", "immutability"]
choices:
  - text: "Arrays can't be state"
    why: "Any value can be state, as long as you replace it instead of mutating it."
  - text: "`push` is asynchronous"
    why: "`push` is synchronous; the array really does change, React just can't tell."
  - text: "It mutates the array and passes the same reference, so React sees no change"
    correct: true
    why: "React compares state with `Object.is`. Same reference, no re-render. Create a new array: `setItems((prev) => [...prev, x])`."
  - text: "`setItems` needs a callback"
    why: "A callback helps with stale values, but passing a new array is what fixes this."
---

## Prompt

Calling `addItem` doesn't re-render the list. Why?

```jsx
function addItem(x) {
  items.push(x);
  setItems(items);
}
```

## Explanation

Treat state as read-only. For arrays: spread to add, `filter` to remove, `map` to change an item.
