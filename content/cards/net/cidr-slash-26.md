---
title: "Subnet maths for a /26"
module: net
type: what-prints
source: "https://docs.python.org/3/library/ipaddress.html"
tags: ["cidr", "subnets", "ip"]
stack: ["python"]
---

## Prompt

What does this print?

```python
import ipaddress

net = ipaddress.ip_network("10.0.4.64/26")
print(net.num_addresses, net.broadcast_address, len(list(net.hosts())))
print(ipaddress.ip_address("10.0.4.130") in net)
```

## Answer

```
64 10.0.4.127 62
False
```

## Explanation

A /26 leaves 32 − 26 = 6 host bits, so 2^6 = 64 addresses: `10.0.4.64` to `10.0.4.127`. The first is the network address and the last is the broadcast, so 62 are usable by hosts. `10.0.4.130` falls in the next /26 (`.128` to `.191`). Quick check: a /26 block always starts at a multiple of 64 in the last octet.
