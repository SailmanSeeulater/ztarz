---
title: "Latency vs bandwidth: the bandwidth-delay product"
module: net
type: concept
source: "https://en.wikipedia.org/wiki/Bandwidth-delay_product"
tags: ["latency", "bandwidth", "tcp", "performance"]
---

## Prompt

A link has 100 Mbit/s of bandwidth and 100 ms round-trip time. How much data must be in flight to fill it, and why does that matter?

## Answer

Bandwidth is how much you can push per second; latency is how long each byte takes to get there and be acknowledged. Their product is how much data fits "in the pipe":

100 Mbit/s × 0.1 s = 10 Mbit = **1.25 MB**.

TCP can only have one window of unacknowledged data out at once. If the window is smaller than the bandwidth-delay product, the sender sits idle waiting for ACKs. Without window scaling, TCP's window tops out at 65,535 bytes, which on this link allows only about 5 Mbit/s however fat the pipe.

The practical lesson: for small requests, round trips dominate, and more bandwidth doesn't help. Cut round trips instead (reuse connections, fewer sequential requests, serve from closer).
