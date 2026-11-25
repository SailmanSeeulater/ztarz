---
title: "The like button that lies after an error"
module: fullstack
type: bug-hunt
source: "https://react.dev/reference/react/useOptimistic"
tags: ["optimistic-ui", "react", "error-handling"]
stack: ["react"]
choices:
  - text: "Server Actions can't be called from an `onClick` handler."
    why: "They can be called from event handlers in Client Components, not only from forms."
  - text: "The state should be initialised in a `useEffect` instead of `useState(initialLiked)`."
    why: "Seeding `useState` from a prop is fine for an initial value; an effect only adds an extra render."
  - text: "`await` inside a click handler freezes the UI until the server replies."
    why: "`await` yields to the event loop; the page stays responsive while the request is in flight."
  - text: "If `toggleLike` fails, the button stays flipped; nothing rolls it back."
    correct: true
    why: "An optimistic update needs an undo path. Revert in a `catch`, or use `useOptimistic`, which falls back to the real value when the action ends."
---

## Prompt

The server sometimes rejects the like (rate limit, expired session). What's wrong?

```tsx
'use client'
export function LikeButton({ postId, initialLiked }: Props) {
  const [liked, setLiked] = useState(initialLiked)

  async function toggle() {
    setLiked(!liked)
    await toggleLike(postId) // Server Action
  }

  return <button onClick={toggle}>{liked ? 'Unlike' : 'Like'}</button>
}
```

## Explanation

Optimistic UI shows the expected result before the server confirms it, so it must be undone when the server says no. With `useOptimistic`, the optimistic value only renders while the action is pending; afterwards React shows the real state again, so a failed request reverts by itself. Catch the error to tell the user why.
