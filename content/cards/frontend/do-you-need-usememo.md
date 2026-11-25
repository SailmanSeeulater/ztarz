---
title: "Do you need useMemo here?"
module: frontend
type: out-loud
source: "https://react.dev/reference/react/useMemo"
tags: ["react", "performance"]
stack: ["react"]
---

## Prompt

You wrapped a 10-item filter in `useMemo`. Do you need it?

## Model answer

Not for 10 items. It pays off when the calculation is expensive or the result goes to a memoized child that would otherwise re-render. With the React Compiler, memoization is mostly automatic anyway.
