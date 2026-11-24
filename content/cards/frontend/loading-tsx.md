---
title: "What loading.tsx does"
module: frontend
type: mcq
source: "https://nextjs.org/docs/app/api-reference/file-conventions/loading"
tags: ["nextjs", "suspense"]
choices:
  - text: "Preloads images"
    why: "Images aren't involved."
  - text: "Shows a spinner on every navigation in the app"
    why: "It only applies to its own segment and below."
  - text: "Wraps the segment in Suspense so a loading UI shows instantly while data resolves"
    correct: true
    why: "It's an automatic Suspense fallback for that route segment."
  - text: "Runs before the proxy"
    why: "The proxy runs before any rendering."
---

## Prompt

What does `loading.tsx` do?
