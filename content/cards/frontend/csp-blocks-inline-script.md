---
title: "What script-src 'self' allows"
module: frontend
type: mcq
source: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP"
tags: ["security", "csp", "xss"]
choices:
  - text: "`<script>initAnalytics()</script>` in the page"
    why: "Inline scripts are blocked once `script-src` is set. Allow one with a nonce or hash, not `'unsafe-inline'`."
  - text: "`<button onclick=\"save()\">`"
    why: "Inline event handlers are blocked too. Attach the listener from a script file."
  - text: "`<script src=\"https://cdn.example.com/lib.js\">`"
    why: "A different origin isn't `'self'`. You'd have to list that host."
  - text: "`<script src=\"/static/app.js\">`"
    correct: true
    why: "Same-origin script files are exactly what `'self'` allows. Blocking inline script is the point: it's the most common way XSS runs."
---

## Prompt

The page is served with `Content-Security-Policy: script-src 'self'`. Which of these still runs?
