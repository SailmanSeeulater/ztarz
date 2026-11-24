---
title: "tRPC queries vs mutations"
module: backend
type: mcq
source: "https://trpc.io/docs/server/procedures"
tags: ["trpc", "api"]
choices:
  - text: "Queries run on the client"
    why: "Both run on the server; the client only calls them."
  - text: "A query reads data, a mutation writes data"
    correct: true
    why: "Like GET versus POST. Both validate input, usually with a Zod schema."
  - text: "There's no difference"
    why: "They differ in intent, HTTP method and client caching."
  - text: "Mutations can't take input"
    why: "Both take validated input."
---

## Prompt

In tRPC, what's the difference between a query and a mutation?
