---
title: "A slow section without blocking the page"
module: frontend
type: out-loud
source: "https://nextjs.org/docs/app/getting-started/fetching-data"
tags: ["nextjs", "suspense", "streaming"]
stack: ["nextdotjs", "react"]
---

## Prompt

How would you add a slow section to a page without blocking the rest of it?

## Model answer

Move it into its own async Server Component and wrap it in `<Suspense fallback={...}>`. The rest of the page streams first and the slow part fills in when its data resolves.
