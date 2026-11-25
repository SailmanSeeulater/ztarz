---
title: "Two panels, only one open"
module: react
type: out-loud
source: "https://react.dev/learn/sharing-state-between-components"
tags: ["react", "state", "architecture"]
stack: ["react"]
---

## Prompt

An FAQ has `Panel` components that each keep their own `isOpen` state. Now product wants opening one panel to close the others. How do you restructure it?

## Model answer

The panels need to coordinate, so the state can't live in each panel any more. I'd lift it to their closest common parent: the parent holds `openIndex`, and each `Panel` becomes controlled, receiving `isOpen` and an `onOpen` callback as props.

That gives one source of truth: it's impossible for two panels to be open, and the parent can also reset or persist the choice. The trade-off is that changing `openIndex` re-renders the parent and its panels, which is fine for a list this size. I'd keep state as low as it can be while still being shared by everything that needs it.
