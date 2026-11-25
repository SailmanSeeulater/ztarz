---
title: "Central error handling with @ControllerAdvice"
module: springboot
type: concept
source: "https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-advice.html"
tags: ["spring", "exceptions", "controllers"]
stack: ["springboot"]
---

## Prompt

What does `@RestControllerAdvice` do, and how does it relate to `@ExceptionHandler`?

## Answer

An `@ExceptionHandler` method in a controller handles exceptions thrown by that controller only. Put the same methods in a `@ControllerAdvice` (or `@RestControllerAdvice`, which adds `@ResponseBody`) class and they apply to every controller:

```java
@RestControllerAdvice
class ApiErrors {
  @ExceptionHandler(NotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  Map<String, String> notFound(NotFoundException e) {
    return Map.of("error", e.getMessage());
  }
}
```

This gives one place to turn exceptions into consistent HTTP responses instead of `try`/`catch` in every endpoint. A handler declared in a controller is tried before the global ones in the advice.
