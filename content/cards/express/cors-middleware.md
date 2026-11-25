---
title: "Calling your API from another origin"
module: express
type: mcq
source: "https://expressjs.com/en/resources/middleware/cors.html"
tags: ["express", "cors", "security"]
stack: ["express", "nodedotjs"]
choices:
  - text: "Add `Access-Control-Allow-Origin` to the request headers in the frontend `fetch`"
    why: "CORS headers are set by the server in its response. The browser decides from those, not from anything the page sends."
  - text: "Use `fetch(url, { mode: \"no-cors\" })`"
    why: "That gives an opaque response the page can't read, and it can't send a JSON content type."
  - text: "`app.use(cors({ origin: \"*\", credentials: true }))`"
    why: "Browsers refuse a wildcard origin on credentialed requests. Name the allowed origin instead."
  - text: "On the API: `app.use(cors({ origin: \"https://app.example.com\", credentials: true }))` before the routes"
    correct: true
    why: "The `cors` middleware answers preflight `OPTIONS` requests and sets the response headers for the origins you list, including cookies when `credentials` is on."
---

## Prompt

The frontend at `https://app.example.com` calls `https://api.example.com` with cookies, and the browser blocks it with a CORS error. The fix?
