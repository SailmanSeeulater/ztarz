---
title: "Validation annotations that never fire"
module: springboot
type: bug-hunt
source: "https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-validation.html"
tags: ["spring", "validation", "controllers"]
stack: ["springboot"]
choices:
  - text: "`@NotBlank` only works on getters, not record components"
    why: "Constraints on record components work fine once validation is triggered."
  - text: "The `@RequestBody` parameter isn't annotated with `@Valid` (or `@Validated`), so Spring never validates the object"
    correct: true
    why: "`@Valid` asks Spring to apply Bean Validation to that argument. With it, invalid input raises `MethodArgumentNotValidException`, which becomes a 400."
  - text: "Validation only runs in `@Service` classes, not in controllers"
    why: "Controllers are the usual place to validate request bodies."
  - text: "`@Email` needs a regular expression argument to do anything"
    why: "It has a default check. The problem is that no constraint on the object runs at all."
---

## Prompt

A request with `{"email": "not-an-email", "name": ""}` is saved without complaint. Why?

```java
record CreateUser(@Email String email, @NotBlank String name) {}

@PostMapping("/users")
User create(@RequestBody CreateUser body) {
  return users.save(body);
}
```

## Explanation

Constraint annotations on fields are only declarations. Something has to run the validator, and for a request body that trigger is `@Valid` on the parameter: `create(@Valid @RequestBody CreateUser body)`. Failures raise `MethodArgumentNotValidException`, which you can turn into a consistent error response in a `@ControllerAdvice`.
