---
title: The profile that shows the wrong user
module: frontend
type: bug-hunt
source: https://react.dev/learn/synchronizing-with-effects#fetching-data
tags: [react, useEffect, race-condition, data-fetching]
stack: [react]
choices:
  - text: "The response for an *older* `userId` can arrive last and `setUser` overwrites the newer one. Fix: set an `ignore` flag in the effect's cleanup and skip `setUser` when it's true."
    correct: true
    why: "Responses can arrive out of order. Cleanup runs before the next effect, so each stale request gets `ignore = true` and its late result is dropped. An `AbortController` works too, and also cancels the network request."
  - text: "The dependency array should be `[]` so the fetch only runs once."
    why: "Then the profile never refetches when `userId` changes, so it shows the first user forever. That's a different bug, not a fix."
  - text: "The effect callback should be `async` and `await` the fetch."
    why: "An effect callback can't be `async` (it must return nothing or a cleanup function). And awaiting doesn't change the ordering problem; out-of-order responses still win."
  - text: "`<h1>` needs a `key` prop."
    why: "Keys matter for lists of siblings. There's no list here."
---

## Prompt

Click quickly from user 1 to user 2 and the page sometimes ends up showing user 1. Which line is the bug, and what's the fix?

```jsx
function Profile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((r) => r.json())
      .then((data) => setUser(data));
  }, [userId]);

  return <h1>{user?.name}</h1>;
}
```

## Explanation

The fixed version:

```jsx
useEffect(() => {
  let ignore = false;
  fetch(`/api/users/${userId}`)
    .then((r) => r.json())
    .then((data) => {
      if (!ignore) setUser(data);
    });
  return () => {
    ignore = true;
  };
}, [userId]);
```

In real apps, a data library (TanStack Query, SWR) or a Server Component handles this for you. Interviewers want to see that you know *why*.
