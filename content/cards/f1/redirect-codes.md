---
title: "The redirect that keeps the POST"
module: f1
type: mcq
source: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Redirections"
tags: ["http", "redirects"]
choices:
  - text: "301"
    why: "Permanent, but clients may change a POST into a GET when following it, and browsers do."
  - text: "308"
    correct: true
    why: "Permanent, and the method and body must not change. 307 is its temporary twin."
  - text: "302"
    why: "Temporary, and it has the same POST-to-GET problem as 301."
  - text: "304"
    why: "Not Modified is a caching response, not a redirect somewhere else."
---

## Prompt

You've moved an API endpoint permanently, and clients send POSTs to it. Which status makes them POST to the new URL?
