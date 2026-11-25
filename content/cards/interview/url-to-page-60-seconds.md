---
title: "Typing a URL and pressing Enter, in 60 seconds"
module: interview
type: out-loud
source: "https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work"
tags: ["http", "dns", "tls", "browser"]
---

## Prompt

What happens when you type a URL and press Enter? You have a minute.

## Model answer

Four phases: find, connect, ask, render. I'll use my own app as the example.

**Find.** The browser resolves the name to an IP with DNS: its own cache, the OS cache, then a recursive resolver that walks from the root servers to the domain's nameservers. For my app that's an A record pointing at the VPS.

**Connect.** A TCP handshake, then TLS: the server proves it owns the name with a certificate (a Let's Encrypt one served by nginx) and both sides agree session keys.

**Ask.** The browser sends `GET /` with the `Host` header and cookies. nginx proxies it to the Next.js container, which checks the session, renders Server Components and streams HTML back.

**Render.** The browser parses the HTML into the DOM, fetches CSS and JavaScript (hashed assets usually come from its cache), lays out and paints, then hydrates so the page responds to clicks.

Then offer to go deeper on one part: DNS caching and TTLs, the TLS handshake, or the critical rendering path.
