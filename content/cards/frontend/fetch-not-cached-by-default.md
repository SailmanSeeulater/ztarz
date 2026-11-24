---
title: "Is fetch cached by default?"
module: frontend
type: mcq
source: "https://nextjs.org/docs/app/getting-started/caching"
tags: ["nextjs", "caching"]
choices:
  - text: "Yes, forever"
    why: "That was Next 14's default, and the reason it changed."
  - text: "No. You opt in (Next 16: `\"use cache\"` with `cacheLife` and `cacheTag`)"
    correct: true
    why: "The default flipped in Next 15. Cache Components in Next 16 make caching explicit."
  - text: "Yes, for 60 seconds"
    why: "There's no 60-second default."
  - text: "Only in development"
    why: "Development doesn't cache fetches by default either."
---

## Prompt

In Next 15+, is `fetch` in a Server Component cached by default?
