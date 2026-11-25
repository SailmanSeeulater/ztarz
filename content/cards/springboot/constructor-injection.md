---
title: "Why constructor injection"
module: springboot
type: out-loud
source: "https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html"
tags: ["spring", "dependency-injection", "beans"]
stack: ["springboot"]
---

## Prompt

What is dependency injection in Spring, and why does the Spring team recommend constructor injection over field injection?

## Model answer

A bean is an object the Spring container creates and manages. Instead of a class building its own collaborators with `new`, it declares what it needs and the container supplies them. That decouples the class from concrete implementations and makes it easy to test.

```java
@Service
class OrderService {
  private final PaymentClient payments;
  OrderService(PaymentClient payments) { this.payments = payments; }
}
```

With a single constructor you don't even need `@Autowired`. Constructor injection is preferred because:

- fields can be `final`, so the component is immutable
- required dependencies can't be null: the object can't exist without them
- the object is always fully initialised when anyone gets it
- in a unit test you just call the constructor with fakes, no container needed

A constructor with many parameters is a useful warning that the class does too much. Setter injection is for genuinely optional dependencies.
