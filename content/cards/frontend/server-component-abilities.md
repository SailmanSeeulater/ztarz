---
title: "What a Server Component can do"
module: frontend
type: mcq
source: "https://nextjs.org/docs/app/getting-started/server-and-client-components"
tags: ["nextjs", "rsc"]
stack: ["nextdotjs", "react"]
choices:
  - text: "Read `localStorage`"
    why: "There's no browser on the server."
  - text: "Query the database directly with `await`"
    correct: true
    why: "Server Components can be async and use the database or secrets directly."
  - text: "Attach an `onClick` handler"
    why: "Event handlers need a Client Component."
  - text: "Use `useState`"
    why: "State needs a Client Component."
---

## Prompt

Which can a Server Component do?
