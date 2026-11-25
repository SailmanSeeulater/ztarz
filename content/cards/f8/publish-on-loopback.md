---
title: "Publishing a container port on 127.0.0.1"
module: f8
type: mcq
source: "https://docs.docker.com/engine/network/port-publishing/#publishing-ports"
tags: ["docker", "nginx", "networking"]
stack: ["docker", "nginx"]
choices:
  - text: "It lets other containers on the same Compose network reach the app"
    why: "Containers on a shared network reach each other by service name and container port. Publishing is about the host."
  - text: "Nothing: without an address, Docker only publishes on localhost anyway"
    why: "The opposite. With no address, Docker publishes on all of the host's addresses, IPv4 and IPv6."
  - text: "It stops the container making outbound connections"
    why: "Port publishing only controls inbound traffic to the host port. Outbound traffic is unaffected."
  - text: "Only the host itself can reach the port, so the one way in from outside is nginx"
    correct: true
    why: "Clients can't skip nginx to hit the app directly over plain HTTP, bypassing TLS, its headers and its limits."
---

## Prompt

nginx on the host proxies to the app container. What does the `127.0.0.1` in this mapping buy you, compared with plain `"3020:3000"`?

```yaml
ports:
  - "127.0.0.1:3020:3000"
```
