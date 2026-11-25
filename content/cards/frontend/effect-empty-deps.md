---
title: "When an effect with [] runs"
module: frontend
type: mcq
source: "https://react.dev/reference/react/useEffect"
tags: ["react", "useEffect"]
stack: ["react"]
choices:
  - text: "Before every render"
    why: "Effects never run before rendering; they run after React commits to the screen."
  - text: "Only when the component unmounts"
    why: "That's when its cleanup runs, not the effect itself."
  - text: "Once after the first render (in development Strict Mode, setup runs, cleans up, and runs again)"
    correct: true
    why: "An empty dependency array means after mount only. Strict Mode's extra cycle in dev surfaces missing cleanups."
  - text: "After every render"
    why: "That's an effect with no dependency array at all."
---

## Prompt

`useEffect(fn, [])` runs when?
