---
title: "What makes Suspense show its fallback"
module: react
type: mcq
source: "https://react.dev/reference/react/Suspense"
tags: ["react", "suspense", "data-fetching"]
stack: ["react"]
choices:
  - text: "A child that fetches data in `useEffect` and sets loading state"
    why: "Suspense doesn't detect data fetched inside an Effect or an event handler. That component just renders its own loading UI."
  - text: "Any child that is slow to render"
    why: "Slow synchronous rendering doesn't suspend; it just blocks."
  - text: "A child loaded with `lazy()`, or one reading a promise with `use()` or a Suspense-enabled framework's data"
    correct: true
    why: "Only Suspense-enabled sources activate it: lazy-loaded code, `use(promise)`, and frameworks such as Next.js with async Server Components."
  - text: "Any child that throws an error"
    why: "Errors go to the nearest error boundary, not to Suspense."
---

## Prompt

Which child makes a surrounding `<Suspense fallback={<Spinner />}>` show the spinner?
