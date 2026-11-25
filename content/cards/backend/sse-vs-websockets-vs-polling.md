---
title: "Live updates: SSE, WebSockets or polling"
module: backend
type: mcq
source: "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events"
tags: ["real-time", "http", "websockets", "sse"]
choices:
  - text: "Poll `GET /jobs/42` every 500 ms"
    why: "Works, but most requests return nothing new, and updates still lag by up to the interval."
  - text: "Server-sent events: one long HTTP response the browser reads with `EventSource`"
    correct: true
    why: "One-way, server to client, plain HTTP, and `EventSource` reconnects on its own. On HTTP/1.1 browsers allow only 6 connections per domain, so serve it over HTTP/2."
  - text: "A WebSocket"
    why: "It works, but it's a two-way protocol you don't need here. Pick it when the client also sends often: chat, collaborative editing, games."
  - text: "A gRPC server stream straight from the browser"
    why: "Browsers can't speak gRPC directly; you'd need gRPC-Web and a proxy."
---

## Prompt

A page shows live progress for a long export job. The server pushes updates; the browser never sends anything back on that channel. What's the simplest good fit?
