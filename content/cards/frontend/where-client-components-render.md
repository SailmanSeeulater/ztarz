---
title: "Where a Client Component renders"
module: frontend
type: mcq
source: "https://nextjs.org/docs/app/getting-started/server-and-client-components"
tags: ["nextjs", "rsc", "hydration"]
stack: ["nextdotjs", "react"]
choices:
  - text: "Only in the browser"
    why: "It's prerendered to HTML on the server too."
  - text: "In a Web Worker"
    why: "It runs on the main thread like any React code."
  - text: "Only on the server"
    why: "That's a Server Component."
  - text: "On the server to HTML first, then it hydrates in the browser"
    correct: true
    why: "The classic trick question. \"Client\" means it *also* runs in the browser."
---

## Prompt

Where does a Client Component render?
