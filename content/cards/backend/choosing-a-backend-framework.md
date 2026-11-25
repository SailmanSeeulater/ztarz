---
title: "Express vs NestJS vs FastAPI vs Spring Boot"
module: backend
type: comparison
source: "https://docs.nestjs.com/"
tags: ["frameworks", "tradeoffs", "node", "python", "java"]
stack: ["express", "nestjs", "fastapi"]
---

## What it is

- **Express:** a minimal Node.js web framework: routing plus a chain of middleware functions.
- **NestJS:** a TypeScript framework for Node.js with an opinionated, Angular-inspired structure. It runs on Express by default and can use Fastify.
- **FastAPI:** a Python framework built on Starlette (ASGI) and Pydantic, driven by type hints.
- **Spring Boot:** the Java (or Kotlin) Spring ecosystem with auto-configuration and an embedded server.

## How it models the problem

- **Express:** `app.get(path, handler)` and `app.use(middleware)`. Structure, validation and dependency injection are up to you.
- **NestJS:** modules, controllers and providers wired together by dependency injection, with decorators for routes, guards and pipes.
- **FastAPI:** typed function parameters and Pydantic models declare the request; the framework validates input and generates an OpenAPI spec from the same code.
- **Spring Boot:** annotated classes (`@RestController`, `@Service`) in a dependency injection container, with starters that configure common pieces for you.

## Where it shines

- **Express:** small services and prototypes, and the largest middleware ecosystem in Node.
- **NestJS:** larger TypeScript teams that want a consistent architecture across many services.
- **FastAPI:** Python teams, data and ML-adjacent APIs, and free interactive docs at `/docs`.
- **Spring Boot:** big enterprise systems, mature libraries for security, data and messaging, and the JVM's performance and tooling.

## Where it bites

- **Express:** with no structure, every codebase invents its own, and big ones drift.
- **NestJS:** decorators and DI feel heavy for a small service, and there are more concepts to learn.
- **FastAPI:** mixing blocking calls into `async` endpoints stalls the event loop; Python's raw throughput is lower.
- **Spring Boot:** heavier start-up and memory use, and a lot of behaviour happens implicitly through configuration.

## What interviewers ask

- *Which would you pick?* The one the team knows, and whose language the rest of the stack uses. Then: does the team need structure imposed (NestJS, Spring) or freedom (Express)?
- *How does NestJS relate to Express?* It's a layer on top: by default Nest runs on Express, which handles the HTTP underneath.
- *Where does validation happen?* Pydantic models in FastAPI, pipes with class-validator in NestJS, Bean Validation in Spring, and in Express a library you choose, such as Zod.
