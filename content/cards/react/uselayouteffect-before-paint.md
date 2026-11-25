---
title: "The tooltip that flickers into place"
module: react
type: mcq
source: "https://react.dev/reference/react/useLayoutEffect"
tags: ["react", "effects", "layout"]
stack: ["react"]
choices:
  - text: "Measure in `useLayoutEffect`, which runs after the DOM update but before the browser paints"
    correct: true
    why: "React re-renders with the corrected position before anything reaches the screen. It blocks painting, so keep it for measurements like this and use `useEffect` otherwise."
  - text: "Measure in the component body during render"
    why: "During render the DOM hasn't been updated yet, and reading layout there makes render impure."
  - text: "Wrap the position in `useMemo`"
    why: "`useMemo` caches a calculation; it can't read the tooltip's size from the DOM."
  - text: "Add a `setTimeout(..., 0)` inside `useEffect`"
    why: "That delays the measurement further, so the wrong position stays on screen even longer."
---

## Prompt

A tooltip measures its own height in `useEffect` and moves above the target if there's no room below. Users briefly see it in the wrong spot. Fix?
