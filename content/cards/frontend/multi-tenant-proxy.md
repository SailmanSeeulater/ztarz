---
title: "Serving two brands from one app"
module: frontend
type: mcq
source: "https://nextjs.org/docs/app/getting-started/proxy"
tags: ["nextjs", "multi-tenant", "proxy"]
stack: ["nextdotjs"]
choices:
  - text: "In `next.config` at build time"
    why: "Tenants are decided per request, not per build."
  - text: "In each Client Component with `window.location`"
    why: "Too late: the server already rendered, and every component repeats the work."
  - text: "In `proxy.ts` (formerly middleware): read the hostname and rewrite to a `[tenant]` segment"
    correct: true
    why: "Then load the tenant's theme and config and scope every query by tenant id. Next 16 renamed `middleware.ts` to `proxy.ts`."
  - text: "In `loading.tsx`"
    why: "That's a loading UI."
---

## Prompt

One Next app should serve `brandA.com` and `brandB.com`. Where do you resolve the tenant?
