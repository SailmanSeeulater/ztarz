---
title: "PathVariable, RequestParam or RequestBody"
module: springboot
type: mcq
source: "https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html"
tags: ["spring", "rest", "controllers"]
stack: ["springboot"]
choices:
  - text: "`@RequestParam Long id`, `@PathVariable String sort`, `@RequestBody OrderUpdate body`"
    why: "Swapped: `{id}` in the path is a path variable, and `?sort=` is a request (query) parameter."
  - text: "`@PathVariable Long id`, `@RequestParam String sort`, `@RequestBody OrderUpdate body`"
    correct: true
    why: "Path segments map with `@PathVariable`, query string values with `@RequestParam`, and the JSON body is deserialised into an object with `@RequestBody`."
  - text: "`@PathVariable Long id`, `@RequestParam String sort`, `@ModelAttribute OrderUpdate body`"
    why: "`@ModelAttribute` binds form fields and query parameters, not a JSON request body."
  - text: "`@RequestBody` for all three, since they all arrive in the request"
    why: "There's only one body. The id and sort come from the URL."
---

## Prompt

In a `@RestController`, which annotations bind the three inputs of `PUT /orders/42?sort=date` with a JSON body?

```java
@PutMapping("/orders/{id}")
Order update(___ Long id, ___ String sort, ___ OrderUpdate body)
```
