---
title: "Caching behind a CDN without stale deploys"
module: swe
type: concept
source: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching#cache_busting"
tags: ["system-design", "cdn", "http-caching"]
---

## Prompt

You put a CDN in front of your site. How do you set caching so static files are served from the edge for a long time, yet users get the new version straight after a deploy?

## Answer

Split the files by whether their URL can change.

- **Static assets** (JS, CSS, images): put a content hash in the filename, such as `app.3f9a1c.js`, and serve them with `Cache-Control: public, max-age=31536000, immutable`. New content gets a new URL, so a cached copy can never be stale and the CDN can keep it for a year.
- **HTML** (fixed URLs like `/`): serve with `Cache-Control: no-cache` plus an `ETag`. Caches may store it but must revalidate each time; an unchanged page costs only a `304 Not Modified`. Add `private` if the HTML is personalised, so shared caches don't store it at all.

After a deploy, the fresh HTML points at the new hashed files, and the old ones simply stop being requested. If you do want the CDN to hold HTML for a while, give it a short TTL and purge it on deploy.
