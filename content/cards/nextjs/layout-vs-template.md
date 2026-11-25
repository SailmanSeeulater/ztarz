---
title: "layout.tsx or template.tsx?"
module: nextjs
type: mcq
source: "https://nextjs.org/docs/app/api-reference/file-conventions/template"
tags: ["nextjs", "app-router", "layouts"]
stack: ["nextdotjs", "react"]
choices:
  - text: "A layout, because layouts re-mount on every navigation"
    why: "Layouts persist across navigations and keep their state. That's the problem here."
  - text: "A template, because it gets a unique key per route, so its Client Component children remount and reset on navigation"
    correct: true
    why: "Templates render between a layout and its children and are re-created on each navigation, which also re-runs effects such as a page-view log."
  - text: "Either: they behave identically and differ only in name"
    why: "The key is the whole difference: layouts keep state, templates reset it."
  - text: "Neither; only `loading.tsx` can reset state"
    why: "`loading.tsx` is a Suspense fallback; it doesn't reset anything."
---

## Prompt

A feedback form sits in a shared wrapper around `/docs/[slug]`. Moving to another doc should clear the form and log a page view. Which file should the wrapper be?
