---
title: "Keeping the UI responsive with useTransition"
module: react
type: concept
source: "https://react.dev/reference/react/useTransition"
tags: ["react", "concurrency", "performance"]
stack: ["react"]
---

## Prompt

Clicking the "Reports" tab renders a heavy chart, and the whole page freezes until it's done. What does `useTransition` do about it?

## Answer

```jsx
const [isPending, startTransition] = useTransition();

function selectTab(next) {
  startTransition(() => setTab(next));
}
```

State updates inside `startTransition` are marked non-urgent. React renders them in the background and can interrupt that work if something urgent happens, such as another click, so the UI stays responsive. `isPending` lets you show a subtle loading hint meanwhile.

It doesn't make the chart render faster, and it can't be used for updates that control a text input, which must stay synchronous.
