---
title: "Static shell and streamed parts"
module: nextjs
type: out-loud
source: "https://nextjs.org/docs/app/getting-started/caching"
tags: ["nextjs", "caching", "cache-components", "rendering"]
stack: ["nextdotjs", "react"]
---

## Prompt

With Cache Components on, a product page has a header, a cached product description and a per-user basket. Explain how Next.js renders it.

## Model answer

Next.js prerenders as much of the route as it can into a static shell. Synchronous work and anything marked `"use cache"`, such as the product description with a `cacheLife`, completes during prerendering, so it goes into the shell and is served instantly.

The basket depends on cookies, which are runtime data, so it can't be prerendered. I'd wrap it in `<Suspense>` with a fallback. The fallback ships in the shell and the basket streams in at request time. If uncached or runtime data isn't inside a Suspense boundary, Next.js flags the route as blocking during development.

When the product changes, I'd invalidate it with its cache tag rather than making the whole page dynamic.
