---
title: "A generic function that won't compare"
module: rust
type: bug-hunt
source: "https://doc.rust-lang.org/book/ch10-01-syntax.html"
tags: ["rust", "generics", "traits"]
stack: ["rust"]
choices:
  - text: "Generic functions can't return references"
    why: "They can. The error is about `>`, not the return type."
  - text: "Use `T: Copy` so the items can be compared"
    why: "`Copy` lets you duplicate values; it says nothing about ordering."
  - text: "Rust has no generics over slices; write one function per type"
    why: "Generics exist precisely to avoid that duplication."
  - text: "`T` could be any type, and not every type can be compared; add the bound `T: PartialOrd`"
    correct: true
    why: "A trait bound restricts `T` to types that implement the trait, so the compiler knows `>` exists for every `T` the caller can pass."
---

## Prompt

This fails with "binary operation `>` cannot be applied to type `&T`". What's the fix?

```rust
fn largest<T>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}
```

## Explanation

Rust checks a generic function's body once, against what its signature promises, not against each type it happens to be called with. With a bare `T`, the signature promises nothing, so `>` isn't allowed. `fn largest<T: PartialOrd>(list: &[T]) -> &T` promises that every `T` implements `PartialOrd`, which provides `>`. The compiler then generates specialised code per concrete type (monomorphisation), so generics cost nothing at runtime.
