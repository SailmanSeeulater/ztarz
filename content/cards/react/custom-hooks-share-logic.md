---
title: "Do two components share a custom hook's state?"
module: react
type: mcq
source: "https://react.dev/learn/reusing-logic-with-custom-hooks"
tags: ["react", "hooks", "custom-hooks"]
stack: ["react"]
choices:
  - text: "Yes, a custom hook's state is a singleton shared by every caller"
    why: "That's what a context or an external store is for. Hooks don't share state."
  - text: "Only if both components are rendered under the same parent"
    why: "Tree position doesn't link them. Each call is independent wherever it is."
  - text: "Yes, but only after the first render"
    why: "There's no point at which separate calls start sharing."
  - text: "No: each call gets its own independent state. Custom hooks share logic, not state"
    correct: true
    why: "Calling `useOnlineStatus()` is like calling the hooks inside it directly in each component. To share the actual value, lift it up or put it in context."
---

## Prompt

`StatusBar` and `SaveButton` both call `useOnlineStatus()`, which uses `useState` and `useEffect` inside. Do they share one piece of state?
