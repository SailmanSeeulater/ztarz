---
title: The interval counter that stops at 1
module: frontend
type: what-prints
source: https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
tags: [react, hooks, closures, useEffect]
stack: [react]
---

## Prompt

This component mounts and runs for 5 seconds. What number is on screen?

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>{count}</p>;
}
```

## Answer

`1`, and it stays at `1` forever.

## Explanation

The effect runs once (empty dependency array), so the interval callback closes over the `count` from the **first render**, which is `0`. Every tick calls `setCount(0 + 1)`. The first tick changes state to `1`; every later tick sets it to `1` again, which React skips as a no-op.

**Fix:** use the updater form so each tick reads the latest state instead of the captured one:

```jsx
setCount((c) => c + 1);
```

Adding `count` to the dependency array also "works", but it tears down and recreates the interval on every tick.
