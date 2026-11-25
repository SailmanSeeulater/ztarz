---
title: "String vs &str"
module: rust
type: concept
source: "https://doc.rust-lang.org/book/ch04-03-slices.html"
tags: ["rust", "strings", "slices"]
stack: ["rust"]
---

## Prompt

What's the difference between `String` and `&str`, and which should a function take as a parameter?

## Answer

- **`String`** is an owned, growable, heap-allocated UTF-8 buffer. You can push to it, and it's freed when its owner goes out of scope.
- **`&str`** is a string slice: a borrowed view (pointer plus length) into UTF-8 data owned by someone else. String literals like `"hi"` are `&str` slices pointing into the program binary.

For a parameter you only read, take `&str`, not `&String`:

```rust
fn first_word(s: &str) -> &str
```

It accepts both: pass a literal directly, or a `String` as `&s` or `&s[..]`. Take `String` only when the function needs to own or keep the text.
