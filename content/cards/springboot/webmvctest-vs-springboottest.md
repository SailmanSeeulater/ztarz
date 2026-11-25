---
title: "@WebMvcTest vs @SpringBootTest"
module: springboot
type: comparison
source: "https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html"
tags: ["spring-boot", "testing"]
stack: ["springboot", "junit5"]
---

## What it is

Two ways to start Spring in a test. `@SpringBootTest` boots the whole application context. `@WebMvcTest` is a **test slice**: it starts only the Spring MVC layer.

## How it models the problem

`@SpringBootTest` loads every bean, as in production, optionally with a real server on a random port. `@WebMvcTest(UserController.class)` scans only web components (`@Controller`, `@ControllerAdvice`, converters, filters) and gives you `MockMvc` to send fake requests; regular `@Component` and `@Service` beans aren't created, so you replace them with `@MockitoBean`.

## Where it shines

`@WebMvcTest`: fast, focused tests of request mapping, validation, JSON shape and status codes. `@SpringBootTest`: end-to-end checks that the pieces really wire together, with real configuration and database.

## Where it bites

`@WebMvcTest` won't catch wiring or SQL bugs because those beans are mocked, and a missing mock makes the context fail to start. `@SpringBootTest` is slow, and many tests with slightly different configuration each start a fresh context.

## What interviewers ask

"How would you test a controller without a database?" `@WebMvcTest` with the service mocked. Follow-ups: what other slices exist (`@DataJpaTest` for repositories), and why a few full `@SpringBootTest` tests are still worth having.
