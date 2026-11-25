---
title: "route.ts next to page.tsx"
module: nextjs
type: mcq
source: "https://nextjs.org/docs/app/getting-started/route-handlers"
tags: ["nextjs", "route-handlers", "routing"]
stack: ["nextdotjs"]
choices:
  - text: "Browsers get the page; other clients get the Route Handler"
    why: "Next.js doesn't split by client. The two files claim the same URL."
  - text: "It's a conflict: `route.ts` and `page.tsx` can't sit in the same route segment. Move the handler to something like `app/reports/export/route.ts`"
    correct: true
    why: "Each `route.ts` or `page.tsx` takes over all HTTP methods for its route, so one segment can have only one of them."
  - text: "GET goes to the page and POST goes to the Route Handler"
    why: "A page doesn't share methods with a Route Handler; either file owns every method for the route."
  - text: "The Route Handler wins and the page is ignored silently"
    why: "Next.js reports the clash rather than silently picking one."
---

## Prompt

You add `app/reports/route.ts` with a `GET` that returns CSV, next to the existing `app/reports/page.tsx`. What happens?
