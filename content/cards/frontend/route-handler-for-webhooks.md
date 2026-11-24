---
title: "Receiving a partner's webhook"
module: frontend
type: mcq
source: "https://nextjs.org/docs/app/getting-started/route-handlers"
tags: ["nextjs", "webhooks"]
choices:
  - text: "A Route Handler (`app/api/.../route.ts`)"
    correct: true
    why: "Route Handlers are for webhooks, public APIs and non-React clients."
  - text: "A Server Action"
    why: "Server Actions are for your own UI's mutations, with framework-specific wire format."
  - text: "A Client Component"
    why: "The partner's server can't talk to your browser code."
  - text: "`loading.tsx`"
    why: "That's a loading UI."
---

## Prompt

A pharmacy partner needs to POST you status updates. Use…
