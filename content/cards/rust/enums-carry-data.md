---
title: "Enums that carry data"
module: rust
type: concept
source: "https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html"
tags: ["rust", "enums", "types"]
stack: ["rust"]
---

## Prompt

How are Rust enums different from enums in C or Java, and why is that useful?

## Answer

Each variant can hold its own data, of its own shape:

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```

A value is exactly one variant, and the data only exists inside that variant. You get at it with `match`, which makes you handle every case. That replaces patterns like a struct with a `kind` field plus several fields that are only sometimes valid: invalid combinations can't be represented. `Option<T>` and `Result<T, E>` are just enums built this way.
