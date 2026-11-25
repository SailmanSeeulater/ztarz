---
title: "Round robin vs least connections"
module: swe
type: mcq
source: "https://nginx.org/en/docs/http/load_balancing.html"
tags: ["system-design", "load-balancing"]
stack: ["nginx"]
choices:
  - text: "`ip_hash`"
    why: "It pins each client IP to one server for session persistence. It ignores how busy the servers are, so heavy clients still pile onto one."
  - text: "Keep round robin and add more servers"
    why: "Round robin hands out requests in turn, however many slow ones a server is already holding. More servers just spread the imbalance thinner."
  - text: "`least_conn`"
    correct: true
    why: "Each new request goes to the server with the fewest active connections, so a server stuck with long exports stops getting new work until it frees up."
  - text: "Give the overloaded server a lower `weight`"
    why: "Weights describe a server's fixed capacity. The slow requests land on whichever server is next, so the overload just moves around."
---

## Prompt

Your API mixes 20 ms reads with 30-second report exports. With nginx's default round robin, one server is often overloaded while the others sit idle. Which balancing method helps?

```nginx
upstream api {
    server app1:3000;
    server app2:3000;
    server app3:3000;
}
```
