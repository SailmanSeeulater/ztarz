---
title: "What unsafe actually allows"
module: rust
type: concept
source: "https://doc.rust-lang.org/book/ch20-01-unsafe-rust.html"
tags: ["rust", "unsafe", "memory-safety"]
stack: ["rust"]
---

## Prompt

What does an `unsafe` block let you do, and what does it not switch off?

## Answer

It unlocks a short list of extra abilities:

- dereference a raw pointer
- call an unsafe function or method (including C functions over FFI)
- access or modify a mutable static variable
- implement an unsafe trait
- access fields of a `union`

It does **not** turn off the borrow checker or any other check; ordinary references are still checked inside it. `unsafe` means "I, not the compiler, guarantee these operations are sound". Keep the blocks small and wrap them in a safe API, so a memory bug can only come from a few lines you can audit.
