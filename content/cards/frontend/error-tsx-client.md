---
title: "error.tsx must be\u2026"
module: frontend
type: mcq
source: "https://nextjs.org/docs/app/api-reference/file-conventions/error"
tags: ["nextjs", "errors"]
choices:
  - text: "An API route"
    why: "It's a UI file convention."
  - text: "A layout"
    why: "It's its own convention, nested inside the layout."
  - text: "A Server Component"
    why: "Error boundaries can't be Server Components."
  - text: "A Client Component (`\"use client\"`)"
    correct: true
    why: "Error boundaries are a client-side React feature. It gets a function to retry rendering."
---

## Prompt

`error.tsx` must be…
