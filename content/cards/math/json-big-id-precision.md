---
title: "A 64-bit ID that changes in JavaScript"
module: math
type: bug-hunt
source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER"
tags: ["integer-overflow", "precision", "javascript"]
stack: ["javascript"]
choices:
  - text: "The API sends a malformed number, so `JSON.parse` rounds it"
    why: "The JSON is valid. The rounding happens because the parsed value is stored as a double."
  - text: "The ID exceeds `Number.MAX_SAFE_INTEGER`, so it can't be stored exactly"
    correct: true
    why: "Numbers are doubles with 53 bits of precision. Above 2⁵³ − 1 (9007199254740991) neighbouring integers collapse together. Send IDs as strings, or use `BigInt`."
  - text: "It overflows and wraps to a negative number, like a 32-bit int"
    why: "Doubles don't wrap. They lose precision silently, so the value stays positive but becomes a different integer."
  - text: "`fetch` truncates numbers longer than 15 digits"
    why: "`fetch` passes the body through untouched. The loss happens when the text becomes a Number."
---

## Prompt

The backend generates 64-bit IDs. The frontend fetches order `9007199254740993` and then requests `/orders/9007199254740992`, which is someone else's order. Why?

```js
const res = await fetch("/api/orders/latest");
const order = await res.json(); // body: {"id": 9007199254740993}
await fetch(`/api/orders/${order.id}`);
```

## Explanation

MDN shows the effect directly: `Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2` is `true`. Fixed-width integers in other languages overflow by wrapping instead (a signed 32-bit int tops out at 2,147,483,647), which is the other half of this family of bugs. The usual fix is for the API to serialise large IDs as strings.
