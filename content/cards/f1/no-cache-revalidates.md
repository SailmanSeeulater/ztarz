---
title: "What no-cache really means"
module: f1
type: what-prints
source: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control"
tags: ["http", "caching"]
---

## Prompt

A response came back with these headers. What does the browser do the next time it needs the same URL?

```http
Cache-Control: no-cache
ETag: "v42"
```

## Answer

It uses its stored copy only after checking with the server: it sends `If-None-Match: "v42"`, and if nothing changed the server replies `304 Not Modified` with no body.

## Explanation

`no-cache` means "revalidate every time", not "don't cache". To forbid storing the response at all, use `no-store`. The other extreme is hashed build assets, which never change and can be cached for a year with `max-age=31536000, immutable` (ztarz's nginx does this for `/_next/static/`).
