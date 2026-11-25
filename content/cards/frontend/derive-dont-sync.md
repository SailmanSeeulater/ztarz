---
title: "Computing a value from state"
module: frontend
type: mcq
source: "https://react.dev/learn/you-might-not-need-an-effect"
tags: ["react", "derived-state"]
stack: ["react"]
choices:
  - text: "`useMemo` is required"
    why: "`useMemo` is only worth it for expensive work; string concatenation isn't."
  - text: "Compute it during render: `const fullName = first + \" \" + last`"
    correct: true
    why: "Anything you can compute from props or state should be computed during render. It can never go out of sync."
  - text: "A `useEffect` that sets a `fullName` state"
    why: "Adds an extra render with a stale value in between, and it can drift out of sync."
  - text: "A `useRef` updated in an effect"
    why: "Changing a ref doesn't re-render, so the UI would show an old name."
---

## Prompt

You need `fullName` from `first` and `last` state. Best approach?
