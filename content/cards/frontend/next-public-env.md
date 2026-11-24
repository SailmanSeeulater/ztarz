---
title: "Env vars in the browser"
module: frontend
type: mcq
source: "https://nextjs.org/docs/app/guides/environment-variables"
tags: ["nextjs", "config", "security"]
choices:
  - text: "Only variables prefixed `NEXT_PUBLIC_` reach the browser"
    correct: true
    why: "And never put secrets behind `NEXT_PUBLIC_`: they're inlined into the JS bundle."
  - text: "Next strips all env vars"
    why: "Server code can read every variable."
  - text: "Env vars only work in production"
    why: "They work in development too."
  - text: "You must restart the browser"
    why: "The value is inlined at build time; the browser has nothing to reload."
---

## Prompt

An env var is `undefined` in the browser. Why?
