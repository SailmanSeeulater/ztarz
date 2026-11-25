---
title: "Lifetimes in plain terms"
module: rust
type: out-loud
source: "https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html"
tags: ["rust", "lifetimes", "borrowing"]
stack: ["rust"]
---

## Prompt

What is a lifetime in Rust, and why does this signature need `'a`?

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str
```

## Model answer

A lifetime is the stretch of code during which a reference is valid. Its job is to stop dangling references: a reference must never outlive the data it points to.

Most of the time the compiler works lifetimes out itself (the elision rules), so you never write them. Here it can't: the function returns a reference, but it could come from `x` or from `y`, and the compiler checks each function on its own signature.

`'a` doesn't change how long anything lives. It's a promise that ties things together: "the returned reference is valid for as long as both inputs are". The caller's code is then checked against that promise, so using the result after one of the input strings has been dropped is a compile error, not a crash.
