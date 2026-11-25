---
title: "Making a web app work offline"
module: frontend
type: out-loud
source: "https://web.dev/learn/pwa/serving"
tags: ["service-worker", "pwa", "caching", "offline"]
---

## Prompt

How would you make a web app keep working offline?

## Model answer

Register a service worker. It sits between the page and the network, and in its `fetch` handler I call `event.respondWith()` with a response from the Cache Storage API or the network.

Pick a strategy per kind of request:
- **Cache first** for versioned static assets (JS, CSS, fonts): fast, and they never change.
- **Network first** for HTML and API data: fresh when online, the cached copy when not.
- **Stale-while-revalidate** for things that can be a little old, like avatars: serve the cache, refresh it in the background.

Add an offline fallback page and clear out old caches when a new version ships. In practice I'd use Workbox rather than hand-writing it.
