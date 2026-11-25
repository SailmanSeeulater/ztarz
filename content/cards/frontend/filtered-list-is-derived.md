---
title: "Where a search box's filtered list lives"
module: frontend
type: mcq
source: "https://react.dev/learn/you-might-not-need-an-effect"
tags: ["react", "derived-state"]
stack: ["react"]
choices:
  - text: "Its own `useState`, synced in `useEffect`"
    why: "Extra renders, and it can show stale results."
  - text: "In a ref"
    why: "Updating a ref doesn't re-render the list."
  - text: "Computed during render from `users` and `query` (optionally with `useMemo`)"
    correct: true
    why: "Derived state can't go out of sync. Say this out loud in a live coding round."
  - text: "In `localStorage`"
    why: "Slow, synchronous, and unrelated to rendering."
---

## Prompt

Where should the filtered list in a search box live?
