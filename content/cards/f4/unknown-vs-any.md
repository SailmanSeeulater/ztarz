---
title: "unknown vs any"
module: f4
type: mcq
source: "https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown"
tags: ["typescript"]
stack: ["typescript"]
choices:
  - text: "`any` is safer"
    why: "`any` silently disables type checking."
  - text: "They're identical"
    why: "`any` allows everything; `unknown` allows nothing until you narrow."
  - text: "`unknown` forces you to narrow before use; `any` switches checking off"
    correct: true
    why: "Use `unknown` for untrusted data like a JSON response, then validate it (for example with Zod)."
  - text: "`unknown` only works on strings"
    why: "Any value can be `unknown`."
---

## Prompt

TypeScript: `unknown` versus `any`?
