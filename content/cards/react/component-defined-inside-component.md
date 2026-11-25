---
title: "The input that loses focus on every key"
module: react
type: bug-hunt
source: "https://react.dev/learn/preserving-and-resetting-state#different-components-at-the-same-position-reset-state"
tags: ["react", "state", "reconciliation"]
stack: ["react"]
choices:
  - text: "The input needs a `key` prop"
    why: "A key wouldn't help: the problem is the component around the input."
  - text: "`SearchField` is defined inside `Filters`, so every render creates a new component type, and React unmounts the old input and mounts a new one"
    correct: true
    why: "Declare components at the top level and pass what they need as props. A new function each render is a different type to React, so its DOM and state are thrown away."
  - text: "`onChange` should use `e.currentTarget.value`"
    why: "Either works for an input's own change event; this doesn't affect focus."
  - text: "Controlled inputs always lose focus; use `defaultValue`"
    why: "Controlled inputs keep focus fine when the input element itself survives the re-render."
---

## Prompt

Typing one letter in the search box makes it lose focus. Why?

```jsx
function Filters() {
  const [query, setQuery] = useState("");

  function SearchField() {
    return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
  }

  return <SearchField />;
}
```

## Explanation

Each keystroke updates state, `Filters` re-renders and declares a brand-new `SearchField` function. React compares types by identity, sees a different component at that position and resets the subtree, so focus is lost. Move `SearchField` out and pass `query` and `onChange` as props, or just inline the `<input>`.
