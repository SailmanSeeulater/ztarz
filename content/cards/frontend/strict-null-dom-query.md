---
title: "querySelector under strict mode"
module: frontend
type: mcq
source: "https://www.typescriptlang.org/tsconfig/#strictNullChecks"
tags: ["typescript", "dom", "strict"]
stack: ["typescript"]
choices:
  - text: "It compiles: the type argument promises the element exists"
    why: "The type argument only sets what kind of element you get back. The return type is still `HTMLInputElement | null`."
  - text: "Error: `input` is possibly `null`. Handle it, for example `if (!input) return;`"
    correct: true
    why: "With `strictNullChecks` on (part of `strict`), `null` isn't assignable to everything, so you must narrow first. That catches the real bug where the selector matches nothing."
  - text: "Error: `querySelector` doesn't accept a type argument"
    why: "It does. `querySelector<HTMLInputElement>()` is the usual way to type a match the compiler can't infer."
  - text: "It compiles, but only because `focus()` is optional on elements"
    why: "`focus()` is a normal method. The issue is the possible `null`, not the method."
---

## Prompt

With `"strict": true` in tsconfig, what does the compiler say?

```ts
const input = document.querySelector<HTMLInputElement>("#email");
input.focus();
```
