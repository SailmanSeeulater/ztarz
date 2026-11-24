---
title: "The timer with three bugs"
module: frontend
type: bug-hunt
source: "https://react.dev/learn/synchronizing-with-effects"
tags: ["react", "useEffect", "closures"]
choices:
  - text: "Only the missing cleanup"
    why: "Cleanup alone still leaves an effect that re-runs every render."
  - text: "No dependency array, no cleanup, and a stale `seconds`: use `[]`, clear the interval, and `setSeconds((s) => s + 1)`"
    correct: true
    why: "Call out each bug and its fix in order. That's what interviewers grade."
  - text: "`setInterval` isn't allowed in React"
    why: "It's fine inside an effect with cleanup."
  - text: "Only the stale closure"
    why: "Fixing the closure still leaves new intervals piling up every render."
---

## Prompt

What's wrong with this timer? Pick the most complete answer.

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    setInterval(() => setSeconds(seconds + 1), 1000);
  });
  return <p>{seconds}</p>;
}
```

## Explanation

```jsx
useEffect(() => {
  const id = setInterval(() => setSeconds((s) => s + 1), 1000);
  return () => clearInterval(id);
}, []);
```
