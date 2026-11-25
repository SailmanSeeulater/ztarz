---
title: "Wireshark capture filters vs display filters"
module: net
type: mcq
source: "https://wiki.wireshark.org/CaptureFilters"
tags: ["wireshark", "packet-capture", "debugging"]
stack: ["wireshark"]
choices:
  - text: "The field should be `port`, not `tcp.port`, in both filter types"
    why: "`tcp.port` is right for display filters. The two boxes use different languages."
  - text: "Capture filters only accept IP addresses, not ports"
    why: "Capture filters handle ports fine: `tcp port 443`."
  - text: "Capture filters use the libpcap (BPF) syntax, like `tcp port 443`; `tcp.port == 443` is display filter syntax, applied after capture"
    correct: true
    why: "Capture filters decide what gets recorded and are fixed once the capture starts. Display filters only hide packets from the list and can change at any time."
  - text: "Port 443 can't be filtered because the traffic is encrypted"
    why: "TLS encrypts the payload, not the TCP header. Ports are always visible."
---

## Prompt

You type `tcp.port == 443` into Wireshark's capture filter box before starting a capture, and it's rejected as invalid. Why?
