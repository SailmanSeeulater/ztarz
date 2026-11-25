---
title: "tRPC vs an OpenAPI contract"
module: fullstack
type: comparison
source: "https://trpc.io/docs"
tags: ["type-safety", "api", "tradeoffs"]
stack: ["trpc", "openapiinitiative"]
---

## What it is

Two ways to get end-to-end types. tRPC infers the client's types straight from your TypeScript router: no schema file, no code generation. An OpenAPI document is a language-neutral description of an HTTP API that tools turn into typed clients for any language.

## How it models the problem

tRPC: the server code is the contract, and the compiler checks every call. OpenAPI: a spec file, written by hand or generated from the server, is the contract, and clients are regenerated when it changes.

## Where it shines

tRPC: one TypeScript monorepo, a web client, fast iteration; rename a field and every caller fails to compile. OpenAPI: public APIs, mobile apps in Swift or Kotlin, partner integrations and generated docs.

## Where it bites

tRPC: no help for non-TypeScript clients, and the procedures aren't a stable public contract. OpenAPI: a codegen step, and a spec that drifts from the server unless it's generated from it.

## What interviewers ask

"Would you keep tRPC if you added an iOS app?" Not for that client: expose a REST or OpenAPI surface over the same services, and keep tRPC for the TypeScript web app if it still pays off.
