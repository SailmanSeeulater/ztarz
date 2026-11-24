---
title: "Hydration and hydration errors"
module: frontend
type: out-loud
source: "https://nextjs.org/docs/messages/react-hydration-error"
tags: ["nextjs", "hydration"]
---

## Prompt

What is hydration, and what causes hydration errors?

## Model answer

Hydration is React attaching event handlers and state to server-rendered HTML in the browser. The page is visible right away and becomes interactive once hydration finishes; only Client Components hydrate.

Errors happen when the first client render doesn't match the server HTML: dates, `Math.random()`, checking `window` during render, or invalid nesting like a `<div>` inside a `<p>`.
