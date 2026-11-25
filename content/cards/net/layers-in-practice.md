---
title: "The layer model when debugging"
module: net
type: out-loud
source: "https://en.wikipedia.org/wiki/Internet_protocol_suite"
tags: ["layers", "tcp-ip", "debugging"]
---

## Prompt

Walk through the layers an HTTPS request passes through, and show how you'd use them to narrow down "the API is unreachable".

## Model answer

The TCP/IP model has four layers, each wrapping the one above (encapsulation):

1. **Application:** HTTP, with TLS beneath it. The request, headers, status codes.
2. **Transport:** TCP (or UDP). Ports, connections, retransmission.
3. **Internet:** IP. Source and destination addresses, routing hop by hop.
4. **Link:** Ethernet or Wi-Fi frames between neighbours, addressed by MAC.

People still say "layer 4" and "layer 7" from the seven-layer OSI model: 4 is transport, 7 is application.

Debug bottom-up and stop at the first layer that fails:

- **Link and internet:** is the interface up, do I have an address and a route, does `ping` or `traceroute` reach the host?
- **Transport:** is the port open? `nc -vz host 443` or a TCP handshake in a capture. A timeout suggests a firewall; "connection refused" means the host answered but nothing listens.
- **Application:** `curl -v` to see TLS and HTTP. A 502 means the network is fine and the problem is behind the proxy.
