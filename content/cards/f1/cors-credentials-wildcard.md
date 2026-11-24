---
title: "CORS with cookies and a wildcard"
module: f1
type: bug-hunt
source: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS"
tags: ["http", "cors", "security"]
choices:
  - text: "CORS is enforced by the server; the API should turn it off"
    why: "The browser enforces CORS. The server only declares which origins may read its responses."
  - text: "Use `mode: \"no-cors\"` in the fetch"
    why: "The request goes out, but the response is opaque: your code can't read it."
  - text: "With credentials, `*` isn't allowed: echo the exact origin and send `Access-Control-Allow-Credentials: true`"
    correct: true
    why: "Also send `Vary: Origin`, so a cache never serves one origin's response to another."
  - text: "Subdomains of the same site never need CORS"
    why: "An origin is scheme + host + port, so `app.` and `api.` are different origins."
---

## Prompt

The frontend at `https://app.example.com` calls the API at `https://api.example.com` with cookies, and the browser blocks the response. Why?

```js
fetch("https://api.example.com/me", { credentials: "include" });
```

The API responds with:

```http
Access-Control-Allow-Origin: *
```

## Explanation

For a credentialed request the browser refuses a wildcard `Access-Control-Allow-Origin`. The server has to name the origin it trusts (check it against an allowlist, never reflect any origin blindly) and opt in with `Access-Control-Allow-Credentials: true`.
