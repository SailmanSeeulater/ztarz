---
title: "Narrowing a union"
module: f4
type: concept
source: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
tags: ["typescript", "types"]
---

## Prompt

How does TypeScript narrow a union type? Name the tools.

## Answer

Control-flow analysis: after a check, TypeScript knows the more specific type inside that branch.

- `typeof x === "string"`
- truthiness (`if (x)`) and equality (`x === null`)
- `"key" in x`
- `x instanceof Date`
- a discriminant property: `if (state.status === "error")`
- your own type guard: `function isUser(x: unknown): x is User`

Assign the value to `never` in a `default` branch for exhaustiveness checking: add a variant to the union and the compiler points at every switch that doesn't handle it.
