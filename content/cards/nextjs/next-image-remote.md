---
title: "next/image with a CMS URL"
module: nextjs
type: mcq
source: "https://nextjs.org/docs/app/getting-started/images"
tags: ["nextjs", "images", "performance"]
stack: ["nextdotjs"]
choices:
  - text: "Nothing extra: `src` alone is enough for any URL"
    why: "Next.js can't see remote files at build time, so it can't infer the size, and unknown hosts aren't allowed."
  - text: "Convert every image to a static import"
    why: "Static imports only work for files in your repo, not URLs stored in a CMS."
  - text: "Use a plain `<img>`; `next/image` doesn't support remote images"
    why: "It supports them once the host is allowed in config."
  - text: "Allow the host in `images.remotePatterns`, and pass `width` and `height` (or `fill` inside a sized parent)"
    correct: true
    why: "The dimensions give the aspect ratio so space is reserved and the layout doesn't shift. `remotePatterns` limits which hosts the image optimiser will fetch from."
---

## Prompt

Product photos come from `https://cdn.example-cms.com/...`. What does `<Image src={photo.url} alt={photo.alt} />` need to work properly?
