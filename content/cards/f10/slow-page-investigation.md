---
title: "Investigating a slow page"
module: f10
type: out-loud
source: "https://web.dev/articles/vitals"
tags: ["performance", "web-vitals"]
---

## Prompt

A page feels slow. How do you investigate?

## Model answer

Measure first: Lighthouse and Core Web Vitals (LCP, INP, CLS), the React Profiler for wasted renders, and the Network tab for waterfalls and bundle size. Then fix the biggest problem: move work to the server, stream slow parts with Suspense, code-split, use `next/image`, and run independent requests in parallel with `Promise.all`.
