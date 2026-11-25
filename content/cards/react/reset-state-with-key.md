---
title: "The draft that follows you to the next chat"
module: react
type: mcq
source: "https://react.dev/learn/preserving-and-resetting-state#resetting-state-with-a-key"
tags: ["react", "state", "keys"]
stack: ["react"]
choices:
  - text: "Add a `useEffect` that clears the draft whenever `contact` changes"
    why: "It works, but it renders once with the stale draft first and you must remember to reset every piece of state by hand."
  - text: "Render `<Chat key={contact.id} contact={contact} />`"
    correct: true
    why: "A different key tells React it's a different component instance, so it unmounts the old one and mounts a fresh one with fresh state."
  - text: "Move the draft into a `useRef`"
    why: "Refs survive re-renders just like state, and changing one doesn't update the screen."
  - text: "Wrap `Chat` in `React.memo`"
    why: "Memo only skips re-renders. It doesn't reset state."
---

## Prompt

Switching from one contact to another keeps the half-typed message in `<Chat contact={contact} />`. Cleanest way to give each contact a fresh draft?
