---
title: "Why match must be exhaustive"
module: rust
type: mcq
source: "https://doc.rust-lang.org/book/ch06-02-match.html"
tags: ["rust", "match", "enums"]
stack: ["rust"]
choices:
  - text: "It compiles, and returns `None` when the arm is missing"
    why: "Rust never fills in a missing arm silently."
  - text: "It compiles but panics at runtime if `None` arrives"
    why: "The check happens at compile time, so there's no runtime surprise to have."
  - text: "It fails to compile with `non-exhaustive patterns: None not covered`"
    correct: true
    why: "Every possible value must be handled by some arm. Add a `None` arm, or a `_` catch-all if you mean to ignore the rest."
  - text: "It compiles with a warning, because `Option` is a special case"
    why: "`Option` is an ordinary enum and gets the same hard error as any other."
---

## Prompt

What happens with this function?

```rust
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        Some(i) => Some(i + 1),
    }
}
```
