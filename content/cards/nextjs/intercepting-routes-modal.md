---
title: "A photo modal with a shareable URL"
module: nextjs
type: concept
source: "https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes"
tags: ["nextjs", "routing", "intercepting-routes", "modals"]
stack: ["nextdotjs"]
---

## Prompt

Clicking a photo in `/feed` should open it in a modal over the feed, with the URL changing to `/photo/123`. Opening that URL directly should show the full photo page. How does the App Router do this?

## Answer

An intercepting route, usually inside a parallel route slot:

```
app/
  feed/page.tsx
  photo/[id]/page.tsx          # full page for direct visits and refreshes
  @modal/(.)photo/[id]/page.tsx # intercepts client navigation, renders the modal
  @modal/default.tsx           # returns null when no modal is open
```

`(.)` matches a segment on the same level, `(..)` one level up, `(...)` from the app root. These count route segments, not folders, so `@modal` doesn't count. On soft navigation the intercepted version renders; on a refresh or shared link there's nothing to intercept, so the real page renders. Back closes the modal.
