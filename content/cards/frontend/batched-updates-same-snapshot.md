---
title: "Three setCount calls in one click"
module: frontend
type: what-prints
source: "https://react.dev/learn/queueing-a-series-of-state-updates"
tags: ["react", "state", "batching"]
---

## Prompt

Starting from 0, the button is clicked once. What number does it show?

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }
  return <button onClick={handleClick}>{count}</button>;
}
```

## Answer

`1`

## Explanation

All three calls read the same snapshot, where `count` is `0`, so each one sets `1`. React batches them into one re-render.

**Fix:** use the updater form so each call builds on the previous one:

```jsx
setCount((c) => c + 1); // three of these give 3
```
