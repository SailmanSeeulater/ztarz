---
title: Server vs Client Components in 30 seconds
module: frontend
type: out-loud
source: https://nextjs.org/docs/app/getting-started/server-and-client-components
tags: [nextjs, react, rsc]
---

## Prompt

Explain Server Components vs Client Components in about 30 seconds, as if to an interviewer.

## Model answer

- **Server Components** are the default. They render on the server, at build or request time, can read the database and secrets directly, and send no JavaScript of their own to the browser. They can't use state, effects or browser APIs.
- **Client Components** are marked with `"use client"`, which starts a boundary. They're still prerendered to HTML, then **hydrated** in the browser so they can use state, effects and event handlers.
- Keep `"use client"` at the leaves (a button, a form) so most of the tree ships no JS. Props crossing the boundary must be serializable, and you can pass Server Components into a Client Component as `children`.

## Self-check

Did you mention: the default, data access without an API, hydration, and pushing the boundary down?
