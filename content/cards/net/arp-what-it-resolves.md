---
title: "What ARP does before the first packet"
module: net
type: mcq
source: "https://en.wikipedia.org/wiki/Address_Resolution_Protocol"
tags: ["arp", "ethernet", "lan"]
choices:
  - text: "It asks the DNS server for the other machine's address"
    why: "DNS maps names to IP addresses. Here the IP is already known; what's missing is the link-layer (MAC) address."
  - text: "It broadcasts \"who has 192.168.0.55?\" to the whole LAN; that host replies with its MAC address, and both sides cache the answer"
    correct: true
    why: "Ethernet frames are delivered by MAC address, so the sender needs one before it can put the IP packet on the wire."
  - text: "It sends the packet to the router, which forwards it to the right machine"
    why: "On the same subnet the host delivers directly. The router is only used for destinations outside the subnet."
  - text: "It sends the packet to the broadcast MAC so every machine receives it"
    why: "Only the ARP request is broadcast. The data itself goes to the one MAC address learned from the reply."
---

## Prompt

A machine at `192.168.0.10` sends its first IP packet to `192.168.0.55` on the same Ethernet LAN. What has to happen first?
