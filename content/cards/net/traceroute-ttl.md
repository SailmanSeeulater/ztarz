---
title: "How traceroute finds each hop"
module: net
type: mcq
source: "https://en.wikipedia.org/wiki/Traceroute"
tags: ["routing", "traceroute", "icmp"]
choices:
  - text: "Hop 6 is down, so the route is broken"
    why: "Hops 7 to 12 answered, and their probes had to pass through hop 6. Traffic flows; that router just didn't reply."
  - text: "Routers record the path in the packet, and hop 6 erased it"
    why: "Nothing records the path. traceroute rebuilds it from the error messages routers send back."
  - text: "traceroute sends probes with TTL 1, 2, 3 and so on; each router that drops a probe at TTL 0 sends back ICMP Time Exceeded. Hop 6 didn't reply within the timeout, often because it filters or rate-limits those messages"
    correct: true
    why: "Asterisks mean no reply in time. They matter only if every hop after them is also stars."
  - text: "Hop 6 is a firewall that blocks all UDP"
    why: "If it blocked the probes, later hops would never see them and would show stars too."
---

## Prompt

```
 5  core1.example.net   8.1 ms
 6  * * *
 7  edge2.example.net  14.3 ms
...
12  api.example.com    21.7 ms
```

How does traceroute discover hops, and what do the asterisks on hop 6 tell you?
