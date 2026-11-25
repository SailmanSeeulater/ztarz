---
title: "Core Web Vitals and one fix each"
module: frontend
type: out-loud
source: "https://web.dev/articles/vitals"
tags: ["performance", "web-vitals", "lcp", "inp", "cls"]
---

## Prompt

Name the three Core Web Vitals, what "good" means for each, and one fix for each.

## Model answer

- **LCP**, Largest Contentful Paint, is loading: good is within 2.5 seconds. Fix: make the hero image or headline arrive early. Don't lazy-load it, give it `fetchpriority="high"`, and cut server response time.
- **INP**, Interaction to Next Paint, is responsiveness: 200 ms or less. Fix: break up long JavaScript tasks and ship less JS on the main thread.
- **CLS**, Cumulative Layout Shift, is visual stability: 0.1 or less. Fix: set `width` and `height` on images and reserve space for ads, embeds and late banners.

Judge them at the 75th percentile of real users, from field data, not just one Lighthouse run.
