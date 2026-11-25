---
title: "A parallel route that 404s on refresh"
module: nextjs
type: mcq
source: "https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes"
tags: ["nextjs", "routing", "parallel-routes"]
stack: ["nextdotjs"]
choices:
  - text: "Parallel routes only work with client-side navigation"
    why: "They work on full loads too, once each slot has something to render."
  - text: "The `@analytics` folder name must not start with `@`"
    why: "The `@` prefix is exactly what defines a slot."
  - text: "Add `default.tsx` to the slots that have no match for `/dashboard/settings`, including the implicit `children` slot if needed"
    correct: true
    why: "On a full page load Next.js can't recall what an unmatched slot showed before, so it renders that slot's `default.tsx`, or a 404 if there isn't one."
  - text: "Add `loading.tsx` to `@analytics`"
    why: "A loading state doesn't give an unmatched slot anything to render."
---

## Prompt

`app/dashboard/layout.tsx` renders `children` and an `@analytics` slot. Clicking a link to `/dashboard/settings` works, but refreshing that URL shows a 404. Fix?
