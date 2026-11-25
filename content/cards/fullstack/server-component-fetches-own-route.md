---
title: "A Server Component fetching its own API"
module: fullstack
type: bug-hunt
source: "https://nextjs.org/docs/app/guides/backend-for-frontend#server-components"
tags: ["nextjs", "data-fetching", "route-handlers"]
stack: ["nextdotjs"]
choices:
  - text: "Call the data function (for example `getStats()`) directly instead of going through your own Route Handler."
    correct: true
    why: "At build time no server is listening, so prerendering fails; at request time it adds an HTTP round trip from your server to itself."
  - text: "Add `cache: 'no-store'` to the fetch."
    why: "That changes caching, not the fact that the page calls its own server over HTTP."
  - text: "Use a relative URL, `fetch('/api/stats')`."
    why: "A server-side fetch needs an absolute URL; there's no page origin to resolve a relative one against."
  - text: "Move the fetch into a `useEffect`."
    why: "That turns it into client-side fetching: a loading state, an extra request after hydration, and no data in the HTML."
---

## Prompt

This works in `next dev` but fails `next build`, and is slow in production. What's the fix?

```tsx
// app/dashboard/page.tsx (Server Component)
export default async function Dashboard() {
  const res = await fetch('http://localhost:3000/api/stats')
  const stats = await res.json()
  return <Stats data={stats} />
}
```

## Explanation

Server Components already run on the server, so they can read the database or call a shared data-layer function. Route Handlers are for other clients: the browser, mobile apps, webhooks.
