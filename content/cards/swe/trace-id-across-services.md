---
title: "Finding the slow hop in one request"
module: swe
type: mcq
source: "https://opentelemetry.io/docs/concepts/context-propagation/"
tags: ["system-design", "observability", "tracing"]
stack: ["opentelemetry"]
choices:
  - text: "A trace ID created at the edge and passed to every service in a header (W3C `traceparent`); each service records spans under it and stamps it on its logs"
    correct: true
    why: "Each hop becomes a child span of the caller's span in the same trace, so you can open that one slow request and see which span took the 8 seconds."
  - text: "A latency dashboard per service showing the average"
    why: "Averages hide one request in a thousand, and per-service charts can't tell you which calls belonged to the same request."
  - text: "Turn on debug logging in every service"
    why: "More lines with no shared key. You still can't join the gateway's log line to the payments service's for that request."
  - text: "Have each service generate its own request ID and log it"
    why: "Three different IDs for one request can't be stitched together. The ID has to be created once and propagated."
---

## Prompt

Checkout goes through the gateway, the orders service and the payments service. About one request in a thousand takes 8 seconds. What lets you see where the time went for that specific request?
