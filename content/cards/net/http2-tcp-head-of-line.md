---
title: "Why one lost packet stalls every HTTP/2 stream"
module: net
type: mcq
source: "https://www.rfc-editor.org/rfc/rfc9114#section-1"
tags: ["http2", "http3", "quic", "tcp"]
choices:
  - text: "HTTP/2 sends streams one after another instead of interleaving them"
    why: "HTTP/2 does interleave frames from many streams on one connection. That's the multiplexing."
  - text: "TCP delivers one ordered byte stream and knows nothing about HTTP/2's streams, so a lost segment holds back the data for all of them until it's retransmitted"
    correct: true
    why: "HTTP/3 fixes this by running over QUIC, which tracks loss per stream, so only the stream that lost data waits."
  - text: "The TLS session must be renegotiated after any packet loss"
    why: "Loss is handled by TCP retransmission. TLS doesn't renegotiate because of it."
  - text: "Browsers limit HTTP/2 to one active stream on lossy networks"
    why: "There's no such fallback. Many streams stay open; they're all waiting on the same missing bytes."
---

## Prompt

HTTP/2 multiplexes many requests over one TCP connection. On a lossy mobile link, a single dropped packet pauses every request in flight. Why?
