---
title: "Which HTTP methods are idempotent"
module: f1
type: mcq
source: "https://developer.mozilla.org/en-US/docs/Glossary/Idempotent"
tags: ["http"]
choices:
  - text: "GET, POST, PUT"
    why: "POST isn't: sending the same POST twice can create two orders."
  - text: "Only GET"
    why: "PUT and DELETE are idempotent too. GET is also *safe*: it shouldn't change anything at all."
  - text: "GET, PUT, DELETE"
    correct: true
    why: "Repeating them leaves the server in the same state as doing it once (the response can differ: a second DELETE may return 404). That's why clients and proxies can retry them safely."
  - text: "All of them, if the server is written well"
    why: "The method's semantics define it; POST and PATCH aren't guaranteed. You can make a POST safe to retry with an idempotency key, as Stripe's API does."
---

## Prompt

Which set of HTTP methods is idempotent?
