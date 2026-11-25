---
title: "Spring Security's filter chain"
module: springboot
type: out-loud
source: "https://docs.spring.io/spring-security/reference/servlet/architecture.html"
tags: ["spring-security", "authentication", "servlet"]
stack: ["springboot"]
---

## Prompt

How does Spring Security plug into a request in a servlet app?

## Model answer

It's all servlet filters, which run before the request reaches any controller.

The servlet container knows nothing about Spring beans, so Spring registers a `DelegatingFilterProxy` with the container, which hands the request to a Spring bean called `FilterChainProxy`. That bean holds one or more `SecurityFilterChain`s, picks the first one whose matcher fits the request, and runs its security filters in order: things like CSRF protection, reading credentials or a token, and finally authorisation checks. Any filter can stop the request, for example with a 401 or 403, so the controller never runs.

You configure it by declaring a `SecurityFilterChain` bean and saying which paths need which authority. Because order matters, debugging usually means asking which filter rejected the request.
