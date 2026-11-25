---
title: "Are Server Actions secure by default?"
module: frontend
type: mcq
source: "https://nextjs.org/docs/app/guides/data-security"
tags: ["nextjs", "security", "server-actions"]
stack: ["nextdotjs"]
choices:
  - text: "Only in production"
    why: "They behave the same in every environment."
  - text: "No. They're public POST endpoints: validate input and check auth in every one"
    correct: true
    why: "Anyone can call them with any payload. Validate with Zod and authorize inside each action."
  - text: "Yes, only your UI can call them"
    why: "They're reachable by anyone who can send an HTTP request."
  - text: "Yes, if the file has `\"use server\"`"
    why: "`\"use server\"` is what exposes them as endpoints."
---

## Prompt

Are Server Actions secure by default?
