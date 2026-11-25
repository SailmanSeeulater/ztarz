---
title: "The controller Spring never found"
module: springboot
type: bug-hunt
source: "https://docs.spring.io/spring-boot/reference/using/structuring-your-code.html"
tags: ["spring-boot", "component-scanning", "beans"]
stack: ["springboot"]
choices:
  - text: "`@RestController` classes must be registered manually in `application.properties`"
    why: "Controllers are discovered by component scanning; there's no such property."
  - text: "The main class is in `com.example.app`, so component scanning only covers that package and its sub-packages; `com.example.web` is outside it. Move the controller under `com.example.app`"
    correct: true
    why: "`@SpringBootApplication` scans from its own package downwards. Put the main class in a root package above everything else."
  - text: "The mapping needs `@RequestMapping(method = GET)` instead of `@GetMapping`"
    why: "`@GetMapping` is exactly that shortcut; both work."
  - text: "Controllers must be `public` and have a no-argument constructor"
    why: "Spring can inject through constructors with arguments, and visibility isn't the problem here."
---

## Prompt

`GET /health-check` returns 404, and the controller's constructor never runs. Why?

```java
package com.example.app;

@SpringBootApplication
public class App {
  public static void main(String[] args) { SpringApplication.run(App.class, args); }
}
```

```java
package com.example.web;

@RestController
class HealthCheckController {
  @GetMapping("/health-check")
  String ok() { return "ok"; }
}
```

## Explanation

`@SpringBootApplication` includes `@ComponentScan`, which by default searches the package of the annotated class and everything below it for `@Component`, `@Service`, `@Repository`, `@Controller` and `@RestController`. Classes outside that tree are silently ignored. The recommended layout puts the main class in the root package (`com.example`) with features in sub-packages.
