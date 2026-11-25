---
title: "Why Rust has no null"
module: rust
type: out-loud
source: "https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html"
tags: ["rust", "option", "null-safety"]
stack: ["rust"]
---

## Prompt

Rust has no `null`. What does it use instead, and why is that safer?

## Model answer

In languages with null, any reference might be null, and the type system doesn't tell you which. Forget a check and you get a null pointer error at runtime.

Rust makes absence explicit with an ordinary enum from the standard library:

```rust
enum Option<T> { None, Some(T) }
```

An `i32` is always a real number. A value that might be missing has a different type, `Option<i32>`, and you can't use it as an `i32` until you've handled the `None` case, with `match`, `if let`, `?` or a method like `unwrap_or`. The compiler does the checking, so "I assumed it was there" stops being a runtime bug.
