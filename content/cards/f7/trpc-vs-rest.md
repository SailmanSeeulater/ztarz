---
title: "Why tRPC instead of REST"
module: f7
type: out-loud
source: "https://trpc.io/docs/concepts"
tags: ["trpc", "rest", "tradeoffs"]
---

## Prompt

Why tRPC instead of REST here?

## Model answer

Inside one TypeScript codebase, tRPC gives end-to-end types with no API spec to drift, plus input validation with Zod. REST or OpenAPI is better for public APIs and clients that aren't TypeScript. Its React client is TanStack Query underneath.
