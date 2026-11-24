---
title: "Auth in a Next.js app"
module: backend
type: out-loud
source: "https://nextjs.org/docs/app/guides/authentication"
tags: ["nextjs", "auth", "security"]
---

## Prompt

How would you handle auth in a Next.js app?

## Model answer

Redirect signed-out users in `proxy.ts` as an optimistic check, but re-check the session in every Server Component, Server Action, Route Handler and tRPC procedure that touches data. The proxy alone isn't a security boundary. Centralize the checks in a data access layer. In a multi-tenant app, also check the user belongs to the tenant.
