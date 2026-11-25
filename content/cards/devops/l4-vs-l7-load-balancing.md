---
title: "L4 vs L7 load balancing"
module: devops
type: comparison
source: "https://aws.amazon.com/elasticloadbalancing/features/"
tags: ["load-balancing", "networking", "http"]
stack: ["nginx", "aws"]
---

## What it is

Both spread traffic across healthy backends and stop sending to ones that fail health checks. A **layer 4** balancer (AWS NLB, nginx `stream`) works on TCP/UDP connections. A **layer 7** balancer (AWS ALB, nginx `http` with `upstream`) understands HTTP requests.

## How it models the problem

- **L4** picks a backend per connection from the addresses and ports, then shuttles bytes. It never reads the request, so it can carry any protocol.
- **L7** terminates the connection, reads the method, host, path and headers, and routes each request on those, for example `/api` to one pool and everything else to another.

## Where it shines

- **L4:** raw throughput and low latency, static IPs, non-HTTP protocols (Postgres, MQTT, game traffic), TLS passed through untouched.
- **L7:** path and host routing, TLS termination in one place, adding `X-Forwarded-For`, retries, HTTP health checks that hit a real endpoint, WebSockets and HTTP/2.

## Where it bites

- **L4:** no per-request routing, and a TCP health check only proves the port accepts connections, not that the app works. Long-lived connections stick to one backend.
- **L7:** more work per request, it must hold your certificates, and backends see the balancer's IP unless they trust forwarded headers.

## What interviewers ask

- "Route `/api` and `/` to different services: which layer?" (L7.)
- "Why can a TCP health check pass while users get 500s?"
- "Where do you terminate TLS, and how does the backend learn the client IP?"
