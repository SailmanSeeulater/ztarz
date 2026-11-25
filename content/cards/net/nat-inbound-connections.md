---
title: "Why NAT blocks inbound connections"
module: net
type: concept
source: "https://en.wikipedia.org/wiki/Network_address_translation"
tags: ["nat", "routing", "ip"]
---

## Prompt

Your laptop at home can reach any website, but a friend can't connect to a server running on it. What is NAT doing, and what are the ways round it?

## Answer

Your home network uses private addresses (like `192.168.x.x`). The router has one public address. For each **outbound** connection, NAT rewrites the source to the router's public address and records the mapping, so replies can be sent back to the right machine.

An **inbound** connection that nobody inside started has no entry in that table, so the router doesn't know which machine it's for and drops it.

Ways round it:

- **Port forwarding:** a fixed rule sending a public port to one inside address.
- **Hole punching:** both peers connect out at the same time, via a helper server, so each NAT has a mapping.
- **Connect out instead:** run a tunnel or relay the server dials out to, so traffic flows back over an outbound connection.
