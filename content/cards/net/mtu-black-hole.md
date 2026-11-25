---
title: "Connections that hang on large transfers"
module: net
type: bug-hunt
source: "https://en.wikipedia.org/wiki/Path_MTU_Discovery"
tags: ["mtu", "icmp", "vpn", "tcp"]
choices:
  - text: "The server is too slow to send large responses"
    why: "A slow server would still send something. Here the large packets never arrive at all, while small ones do."
  - text: "A link on the path has a smaller MTU, and a firewall drops the ICMP \"packet too big\" replies, so Path MTU Discovery never learns to send smaller packets"
    correct: true
    why: "Full-size packets are silently dropped: a black hole. Allow ICMP unreachable messages, lower the interface MTU, or clamp the TCP MSS on the tunnel."
  - text: "TCP's receive window is too small"
    why: "A small window slows a transfer down; it doesn't make it hang forever after the first few packets."
  - text: "DNS is resolving to the wrong address"
    why: "The handshake and small requests succeed, so the address is right."
---

## Prompt

Over a new VPN, SSH logs in and small API calls work, but downloads and large responses hang forever. You test with "don't fragment" pings:

```
$ ping -M do -s 1372 10.20.0.5   # 1400-byte packets
64 bytes from 10.20.0.5: icmp_seq=1 ttl=63 time=18 ms
$ ping -M do -s 1472 10.20.0.5   # 1500-byte packets
(no reply, no error)
```

What's wrong?

## Explanation

The TCP handshake and small requests use small packets, so they get through. Bulk data uses full 1500-byte packets, which the tunnel can't carry. The router should reply with an ICMP error so the sender shrinks its packets, but that ICMP is blocked, so the sender keeps retrying the same oversized packets and the connection stalls.
