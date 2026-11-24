---
title: "Where tenant scoping lives in tRPC"
module: backend
type: mcq
source: "https://trpc.io/docs/server/context"
tags: ["trpc", "multi-tenant", "security"]
choices:
  - text: "In `localStorage`"
    why: "Client storage is fully under the user's control."
  - text: "In a hidden form field"
    why: "Anything the client sends can be changed."
  - text: "In each React component"
    why: "UI checks hide data; they don't protect it."
  - text: "In the per-request context (`ctx.tenantId`), applied to every query"
    correct: true
    why: "Context is built per request from the session. Never trust a tenant id sent by the client alone."
---

## Prompt

In a multi-tenant tRPC API, where should tenant scoping live?
