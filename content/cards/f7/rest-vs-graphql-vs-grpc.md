---
title: "REST vs GraphQL vs gRPC"
module: f7
type: comparison
source: "https://graphql.org/learn/serving-over-http/"
tags: ["api-design", "rest", "graphql", "grpc", "tradeoffs"]
stack: ["graphql", "grpc"]
---

## What it is

- **REST:** resources at URLs, acted on with HTTP methods and status codes, usually with JSON bodies.
- **GraphQL:** one endpoint (usually `/graphql`) and a typed schema. The client sends a query naming exactly the fields it wants.
- **gRPC:** remote procedure calls defined in Protobuf `.proto` files, with generated client and server code, over HTTP/2.

## How it models the problem

- **REST:** nouns and verbs: `GET /decks/42`, `POST /decks`. The server decides the shape of each response.
- **GraphQL:** a graph of types. The client decides the shape; queries read, mutations write, and each field has a resolver.
- **gRPC:** services with methods, either unary or streaming (server, client or both ways), exchanging compact binary messages.

## Where it shines

- **REST:** public APIs. Any client with `curl` can use it, and HTTP caching, ETags and CDNs work out of the box on GET.
- **GraphQL:** several clients (web, mobile) that need different slices of the same data, in one round trip, without over-fetching. The schema doubles as documentation.
- **gRPC:** internal service-to-service calls: small payloads, strict contracts, deadlines and streaming.

## Where it bites

- **REST:** over-fetching, or chains of requests to assemble one screen. No schema unless you add OpenAPI.
- **GraphQL:** HTTP caching is harder because most queries are POSTs to one URL (persisted queries help). Errors often come back with a `2xx`. Naive resolvers cause N+1 queries, and arbitrary queries need depth or cost limits.
- **gRPC:** browsers can't call it directly (you need gRPC-Web and a proxy), binary payloads are harder to inspect, and shared `.proto` files couple services.

## What interviewers ask

- *Which for a public API?* REST with an OpenAPI spec: universal and cacheable.
- *Why would a GraphQL API return 200 with errors?* Partial success: `data` plus an `errors` array. Don't alert on status codes alone.
- *Between microservices?* gRPC, for typed, fast calls and streaming. Inside one TypeScript codebase, tRPC gives the same end-to-end types with less ceremony.
