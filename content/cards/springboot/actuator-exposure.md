---
title: "Which Actuator endpoints are exposed"
module: springboot
type: mcq
source: "https://docs.spring.io/spring-boot/reference/actuator/endpoints.html"
tags: ["spring-boot", "actuator", "observability", "security"]
stack: ["springboot"]
choices:
  - text: "All endpoints, including `env` and `heapdump`, are exposed over HTTP by default"
    why: "That would leak configuration and memory contents. Boot exposes very little by default for exactly that reason."
  - text: "Only `/actuator/health`; others must be listed in `management.endpoints.web.exposure.include`"
    correct: true
    why: "Endpoints can contain sensitive information, so you opt in to each one and should secure them."
  - text: "None; Actuator only works over JMX"
    why: "Actuator exposes endpoints over HTTP too; `health` is on by default."
  - text: "`health` and `info` are exposed, plus `metrics` when Micrometer is present"
    why: "Only `health` is exposed over HTTP by default. `info` and `metrics` must be included explicitly."
---

## Prompt

You add the Actuator starter to a web app and change nothing else. Which endpoints can you reach over HTTP?
