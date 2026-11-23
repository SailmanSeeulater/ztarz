---
title: Rendering a landing page that only changes on redeploy
module: frontend
type: mcq
source: https://nextjs.org/docs/app/getting-started/caching
tags: [rendering, nextjs, ssg, ssr]
choices:
  - text: "**SSG**: prerender it at build time"
    correct: true
    why: "Nothing on the page varies by request or over time, so render it once at build and serve the HTML from a CDN. Fastest TTFB, zero server work per visit."
  - text: "**SSR**: render it on every request"
    why: "Repeats identical work on every visit and adds server latency to TTFB, for output that never differs between requests."
  - text: "**CSR**: ship a shell and render in the browser"
    why: "Visitors and crawlers get an empty page until JavaScript loads and runs. Worse LCP and SEO, which is the opposite of what a landing page needs."
  - text: "**ISR** with `revalidate: 60`"
    why: "ISR is for content that changes *between* deploys (a CMS, prices). Here it never does, so a timed regeneration buys nothing."
---

## Prompt

A marketing landing page has no per-user content, and its copy only changes when you redeploy. Which rendering strategy fits best?

## Notes

In Next.js App Router with Cache Components, a page that touches no runtime APIs (`cookies()`, `headers()`, `searchParams`) and no uncached data is prerendered into the static shell automatically. That *is* SSG; you don't opt in.
