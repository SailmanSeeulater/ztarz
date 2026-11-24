---
title: "The footer that breaks hydration"
module: frontend
type: bug-hunt
source: "https://nextjs.org/docs/messages/react-hydration-error"
tags: ["nextjs", "hydration"]
choices:
  - text: "The time differs between the server render and the first client render"
    correct: true
    why: "Server HTML must match the first client render. Dates, random values and `window` checks during render are common causes."
  - text: "`toLocaleTimeString` is server-only"
    why: "It works in both places, which is why the outputs differ."
  - text: "`Footer` must be async"
    why: "Async doesn't affect hydration."
  - text: "`Date` isn't allowed in JSX"
    why: "It's allowed; it just produces different text on each machine."
---

## Prompt

Why does this cause a hydration error?

```jsx
export default function Footer() {
  return <p>Rendered at {new Date().toLocaleTimeString()}</p>;
}
```

## Explanation

Fixes: render the time in an effect after mount, pass it down from the server, or mark that one element with `suppressHydrationWarning` if the mismatch is intentional.
