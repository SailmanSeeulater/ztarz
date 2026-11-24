---
title: "When one promise in Promise.all fails"
module: f4
type: mcq
source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all"
tags: ["javascript", "async", "promises"]
choices:
  - text: "It waits for all three, then rejects"
    why: "Closer to `Promise.allSettled`, which waits for every promise and never rejects."
  - text: "It cancels the other two requests"
    why: "Nothing cancels a promise. To actually stop the requests, pass an `AbortController` signal."
  - text: "It rejects right away with that error; the other requests keep running and their results are ignored"
    correct: true
    why: "Use `Promise.allSettled` when you want every outcome, as `{ status, value }` or `{ status, reason }`."
  - text: "It resolves, with `undefined` for the failed one"
    why: "No combinator does that. `allSettled` gives `{ status: \"rejected\", reason }` for failures."
---

## Prompt

You start three requests with `Promise.all`. The second one rejects after 100 ms. What happens?
