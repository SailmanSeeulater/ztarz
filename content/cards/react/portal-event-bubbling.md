---
title: "A click inside a portal"
module: react
type: mcq
source: "https://react.dev/reference/react-dom/createPortal"
tags: ["react", "portals", "events"]
stack: ["react"]
choices:
  - text: "No, because the modal's DOM node is a child of `document.body`, not of the card"
    why: "That's how native DOM events would behave, but React propagates by the React tree."
  - text: "Only if the modal uses `stopPropagation`"
    why: "`stopPropagation` would prevent it, not cause it."
  - text: "Yes, because events from a portal bubble up through its React parents, not its DOM parents"
    correct: true
    why: "A portal changes only where the DOM nodes go. Context and event propagation still follow the component tree, so stop propagation inside the modal if the parent shouldn't react."
  - text: "It depends on whether the modal is a Server Component"
    why: "Portals and event handlers only exist in Client Components."
---

## Prompt

A `Card` with an `onClick` renders a modal via `createPortal(<Modal />, document.body)`. Clicking a button inside the modal: does the card's `onClick` fire?
