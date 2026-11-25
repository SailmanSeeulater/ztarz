---
title: "The App Router's default component"
module: frontend
type: mcq
source: "https://nextjs.org/docs/app/getting-started/server-and-client-components"
tags: ["nextjs", "rsc"]
stack: ["nextdotjs", "react"]
choices:
  - text: "A Server Component"
    correct: true
    why: "Server by default. Add `\"use client\"` at the top of a file to make it a Client Component."
  - text: "A Client Component"
    why: "You opt into client with `\"use client\"`; it's not the default."
  - text: "It depends on the file name"
    why: "File names set routes, not the component type."
  - text: "A static HTML file"
    why: "Components render to HTML, but they're still React components that can fetch data."
---

## Prompt

In the App Router, what is a component by default?
