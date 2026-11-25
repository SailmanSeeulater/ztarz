---
title: "Picking UDP for a voice call"
module: net
type: mcq
source: "https://en.wikipedia.org/wiki/User_Datagram_Protocol"
tags: ["udp", "tcp", "real-time"]
choices:
  - text: "TCP, because losing audio is never acceptable"
    why: "Some loss is fine in audio; a gap of a few milliseconds is barely heard. A long stall while TCP retransmits is much worse."
  - text: "UDP, because a late packet is useless: it's better to skip it than to wait for a retransmission"
    correct: true
    why: "TCP holds back everything after a lost segment until it's resent. For live audio the app would rather play on and conceal the gap."
  - text: "UDP, because it's encrypted by default"
    why: "UDP has no encryption. Real-time apps add their own (SRTP, DTLS, QUIC)."
  - text: "TCP, because NAT routers can't forward UDP"
    why: "NATs translate UDP all the time; DNS and most video calls use it. Mappings may time out sooner, so apps send keep-alives."
---

## Prompt

You're building live voice chat. Should the audio packets go over TCP or UDP, and why?
