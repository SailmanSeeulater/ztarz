---
title: "What a starter is"
module: springboot
type: mcq
source: "https://docs.spring.io/spring-boot/reference/using/build-systems.html#using.build-systems.starters"
tags: ["spring-boot", "dependencies", "build"]
stack: ["springboot", "apachemaven", "gradle"]
choices:
  - text: "A project template that generates source code for a new application"
    why: "That's Spring Initializr. A starter is a dependency you add to a build."
  - text: "A dependency descriptor that pulls in a consistent, supported set of libraries for one job, such as `spring-boot-starter-data-jpa` for JPA"
    correct: true
    why: "One dependency instead of hunting down compatible versions of each library yourself."
  - text: "A main class annotated with `@SpringBootApplication`"
    why: "That's the application's entry point, not a dependency."
  - text: "A plugin that starts the embedded web server"
    why: "The embedded server comes in as a dependency of a web starter; no plugin is needed to start it."
---

## Prompt

What is a Spring Boot "starter"?
