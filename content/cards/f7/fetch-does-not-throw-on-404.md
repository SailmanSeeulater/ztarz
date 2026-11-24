---
title: "fetch and a 404"
module: f7
type: mcq
source: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"
tags: ["fetch", "http", "errors"]
choices:
  - text: "The promise resolves normally, so you must check `res.ok`"
    correct: true
    why: "`fetch` only rejects on network failure. Check `res.ok` and throw yourself."
  - text: "It returns `null`"
    why: "It returns a normal `Response` with `status: 404`."
  - text: "It retries"
    why: "`fetch` never retries on its own."
  - text: "It throws automatically"
    why: "HTTP error statuses still resolve."
---

## Prompt

`fetch` returns a 404. What happens without extra code?
