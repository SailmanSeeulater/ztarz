---
title: "TCP, UDP and where HTTP/3 fits"
module: f1
type: concept
source: "https://developer.mozilla.org/en-US/docs/Glossary/QUIC"
tags: ["tcp", "udp", "http3"]
---

## Prompt

TCP vs UDP: what's the difference, and where does HTTP/3 fit?

## Answer

- **TCP:** a connection with ordered, reliable delivery: lost packets are retransmitted, and congestion control slows down when the network is busy. A lost packet stalls everything queued behind it (head-of-line blocking).
- **UDP:** independent datagrams with no handshake, ordering or delivery guarantee. Used where speed beats completeness: DNS queries, games, video calls.

HTTP/1.1 and HTTP/2 run over TCP. **HTTP/3 runs over QUIC, which is built on UDP**: it implements reliability per stream, so a lost packet only stalls its own stream, and it folds the transport and TLS 1.3 handshakes into one round trip.
