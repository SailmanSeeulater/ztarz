---
title: "Following one request through the logs"
module: backend
type: concept
source: "https://www.w3.org/TR/trace-context/"
tags: ["logging", "observability", "tracing"]
---

## Prompt

A user reports an error. Their request went through a gateway, an API and a background worker. How do you find every log line for that one request?

## Answer

Two habits make it a single search:

- **Structured logs:** one JSON object per event, with fields such as `level`, `msg`, `route`, `userId`, `durationMs` and the request's id, instead of free-text lines you have to grep apart.
- **A correlation id on everything:** create it at the edge, or reuse the incoming W3C `traceparent` header (`00-<trace-id>-<parent-id>-<flags>`). Forward it on every outgoing HTTP call and in every job payload, and attach it to every log line, for example with a child logger per request.

The trace-id stays the same across all services for that operation, so one query returns the whole story. Put the id in error responses too, so support can ask the user for it.
