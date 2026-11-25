---
title: "What the React Compiler does"
module: frontend
type: mcq
source: "https://react.dev/learn/react-compiler"
tags: ["react", "performance"]
stack: ["react"]
choices:
  - text: "Compiles JSX to WebAssembly"
    why: "Its output is still JavaScript."
  - text: "Memoizes components and values automatically"
    correct: true
    why: "It inserts memoization at build time, so you need far fewer manual `useMemo`, `useCallback` and `React.memo` calls."
  - text: "Type-checks props"
    why: "That's TypeScript's job."
  - text: "Removes `useEffect`"
    why: "Effects stay; the compiler only handles memoization."
---

## Prompt

What does the React Compiler (1.0) do for you?
