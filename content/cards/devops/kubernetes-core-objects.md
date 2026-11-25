---
title: "Pod, Deployment, Service, Ingress"
module: devops
type: concept
source: "https://kubernetes.io/docs/concepts/services-networking/service/"
tags: ["kubernetes", "containers"]
stack: ["kubernetes"]
---

## Prompt

A web app on Kubernetes needs a Pod, a Deployment, a Service and an Ingress. What does each one do, in a line?

## Answer

- **Pod:** one or more containers scheduled together with one IP. Pods are disposable; their IPs change when they're replaced.
- **Deployment:** keeps N replicas of a Pod template running, replaces failed Pods, and rolls out new versions gradually (and back with `kubectl rollout undo`).
- **Service:** a stable virtual IP and DNS name in front of whichever Pods match its label selector right now, so clients don't chase Pod IPs.
- **Ingress:** HTTP routing from outside the cluster (host and path rules, TLS) to Services. It needs an ingress controller, such as ingress-nginx, to do anything.

The request path: Ingress → Service → one of the Pods the Deployment keeps alive.
