---
title: "How React decides what to keep"
module: react
type: out-loud
source: "https://react.dev/learn/preserving-and-resetting-state"
tags: ["react", "reconciliation", "keys", "state"]
stack: ["react"]
---

## Prompt

When a component re-renders, how does React decide which DOM nodes and state to keep and which to throw away?

## Model answer

React compares the new element tree with the previous one, position by position. If the element at a position has the same type as before, React keeps that component, with its state and DOM, and just updates its props. If the type changes, say a `div` becomes a `section` or `Counter` becomes `Profile`, React unmounts the whole old subtree, state included, and mounts the new one.

In lists, position alone isn't enough, so React uses `key` to match items between renders. A stable key keeps each item's state attached to it when the list is reordered. You can also use a key on purpose to force a reset.

Two practical consequences: never define a component inside another component, since it's a new type every render, and don't use random or index keys for lists that change.
