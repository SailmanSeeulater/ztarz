---
title: "The square that isn't a rectangle"
module: swe
type: bug-hunt
source: "https://en.wikipedia.org/wiki/Liskov_substitution_principle"
tags: ["solid", "lsp", "inheritance"]
stack: ["typescript"]
choices:
  - text: "`Square` should also override `area()`."
    why: "`area()` is correct for both shapes. The broken promise is in the setters."
  - text: "`stretch` should check `instanceof Square` and handle it separately."
    why: "That's the symptom of an LSP violation: every caller has to know about every subclass."
  - text: "`Square` changes both sides in each setter, breaking `Rectangle`'s promise that width and height change independently."
    correct: true
    why: "A subtype must keep the parent's behaviour, not just its method signatures. Here a square can't stand in for a rectangle, so don't model it as a subclass."
  - text: "TypeScript should reject the override, so the compiler config is wrong."
    why: "The signatures match. Compilers check types, not behavioural contracts."
---

## Prompt

`stretch(new Square(2, 2))` returns 16, not 20. What's the design bug?

```ts
class Rectangle {
  constructor(protected w: number, protected h: number) {}
  setWidth(w: number) { this.w = w }
  setHeight(h: number) { this.h = h }
  area() { return this.w * this.h }
}

class Square extends Rectangle {
  setWidth(w: number) { this.w = w; this.h = w }
  setHeight(h: number) { this.w = h; this.h = h }
}

function stretch(r: Rectangle) {
  r.setWidth(5)
  r.setHeight(4)
  return r.area() // expects 20
}
```

## Explanation

Liskov substitution: code written for a base type must work with any subtype. A subtype can't demand more than the parent, promise less, or break its invariants. "A square is a rectangle" is true in geometry, but not for a mutable `Rectangle` whose sides change independently. Use separate types or immutable shapes instead.
