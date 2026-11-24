---
title: "Server Components inside Client Components"
module: frontend
type: mcq
source: "https://nextjs.org/docs/app/getting-started/server-and-client-components"
tags: ["nextjs", "rsc", "composition"]
choices:
  - text: "Yes, by importing it directly"
    why: "An import from a client file makes that module client code too."
  - text: "Never"
    why: "Composition through props works fine."
  - text: "Only with `dynamic()`"
    why: "`dynamic()` lazy-loads; it doesn't change the boundary rules."
  - text: "Not by importing it, but it can receive one as `children` or another prop"
    correct: true
    why: "Pass server-rendered content into an interactive wrapper through `children`."
---

## Prompt

Can a Client Component render a Server Component?
