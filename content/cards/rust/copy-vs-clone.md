---
title: "Copy vs Clone"
module: rust
type: mcq
source: "https://doc.rust-lang.org/std/marker/trait.Copy.html"
tags: ["rust", "traits", "ownership"]
stack: ["rust"]
choices:
  - text: "`Copy` is an implicit bitwise copy on assignment, so the original stays usable; `Clone` is an explicit `.clone()` call that may do arbitrary work such as copying heap data"
    correct: true
    why: "That's why `i32` is `Copy` but `String` is only `Clone`: duplicating a `String` means allocating a new buffer."
  - text: "`Copy` is a deep copy and `Clone` is a shallow copy"
    why: "Backwards, and misleading. `Copy` only ever copies bits; `Clone` is whatever the type's `clone` method does, often deep."
  - text: "Any struct can derive `Copy`, even one holding a `String`"
    why: "A type can be `Copy` only if all its fields are `Copy`. A `String` field rules it out."
  - text: "A type can implement both `Copy` and `Drop` if the `Drop` does nothing"
    why: "Any type that implements `Drop` can't be `Copy`, whatever its `drop` does."
---

## Prompt

What's the difference between the `Copy` and `Clone` traits?
