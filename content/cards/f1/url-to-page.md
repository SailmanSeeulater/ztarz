---
title: "From URL to page"
module: f1
type: out-loud
source: "https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work"
tags: ["http", "dns", "tls", "browser"]
---

## Prompt

You type `https://example.com` into the address bar and press Enter. Walk through everything that happens until the page is on screen.

## Model answer

1. **DNS:** the browser needs an IP. It checks its own cache, then the OS, then asks a recursive resolver, which walks root → `.com` → example.com's authoritative nameserver.
2. **Connect:** a TCP handshake to port 443 (or QUIC over UDP for HTTP/3).
3. **TLS:** the server presents its certificate; the browser checks it's signed by a trusted CA and matches the hostname; both sides agree on session keys.
4. **Request:** `GET /` with headers like `Host`, `Accept` and cookies.
5. **Server:** often a CDN, load balancer or reverse proxy first, then the app, which returns a status, headers and HTML.
6. **Render:** the browser parses HTML into the DOM, fetches CSS, JS and images (more requests, usually on the same connection), builds the CSSOM, runs scripts, then lays out and paints.

Name where each step can be slow: DNS lookups, extra round trips for the handshakes, a slow server, render-blocking CSS and JS.
