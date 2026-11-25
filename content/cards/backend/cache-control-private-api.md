---
title: "Caching /api/me behind a CDN"
module: backend
type: mcq
source: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control"
tags: ["http", "caching", "cdn"]
choices:
  - text: "`Cache-Control: public, max-age=300`"
    why: "`public` lets the CDN store it, so Bob can be served Alice's profile for five minutes."
  - text: "`Cache-Control: s-maxage=300`"
    why: "`s-maxage` is aimed at shared caches like the CDN. It's the worst choice for per-user data."
  - text: "No header; CDNs don't cache API responses anyway"
    why: "Caches can apply heuristics and CDN rules vary. Say what you mean explicitly."
  - text: "`Cache-Control: private, no-cache`"
    correct: true
    why: "Only the browser may store it, and it must revalidate (with an ETag) before reuse. Use `no-store` for data that shouldn't be kept at all."
---

## Prompt

`GET /api/me` returns the signed-in user's profile, and a CDN sits in front of the API. Which header is right?
