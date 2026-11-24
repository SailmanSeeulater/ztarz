---
title: "Where \"use client\" goes"
module: frontend
type: mcq
source: "https://nextjs.org/docs/app/api-reference/directives/use-client"
tags: ["nextjs", "rsc", "bundle-size"]
choices:
  - text: "On the smallest interactive piece, as low in the tree as possible"
    correct: true
    why: "It marks a boundary: that file and everything it imports ships to the browser. Keep it on leaves like a button or form."
  - text: "At the top of the root layout"
    why: "That turns the whole app into client code."
  - text: "On Server Actions"
    why: "Server Actions use `\"use server\"`."
  - text: "On every page"
    why: "Pages are best kept as Server Components that fetch data."
---

## Prompt

Where should `"use client"` go?
