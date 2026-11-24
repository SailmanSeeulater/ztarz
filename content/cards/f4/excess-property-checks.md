---
title: "Extra properties: which line compiles?"
module: f4
type: mcq
source: "https://www.typescriptlang.org/docs/handbook/2/objects.html"
tags: ["typescript", "types"]
choices:
  - text: "Both"
    why: "① is an error: \"Object literal may only specify known properties\"."
  - text: "Only ②"
    correct: true
    why: "Excess property checks only apply to a fresh object literal assigned straight to a type (①), where an extra key is probably a typo. ② passes structural typing: `raw` has everything `User` needs, and extra properties are allowed."
  - text: "Neither"
    why: "② compiles. TypeScript's types are structural, not exact."
  - text: "Only ①"
    why: "It's the other way round."
---

## Prompt

Which of the marked lines compile?

```ts
type User = { name: string };

const a: User = { name: "Ana", admin: true }; // ①

const raw = { name: "Ben", admin: true };
const b: User = raw;                          // ②
```
