---
title: "Using a String after moving it"
module: rust
type: bug-hunt
source: "https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html"
tags: ["rust", "ownership", "move"]
stack: ["rust"]
choices:
  - text: "`s1` was dropped at the end of line 2, so its memory is already freed"
    why: "Nothing is dropped yet; both names are still in scope. The value now belongs to `s2` and will be freed when `s2` goes out of scope."
  - text: "`let s2 = s1;` moved ownership to `s2`, so `s1` is no longer valid; use `s1.clone()` if you need two owned copies"
    correct: true
    why: "Assigning a `String` moves it. The compiler forbids using `s1` afterwards, which is how Rust avoids two owners freeing the same heap memory."
  - text: "`println!` needs `&s1`, not `s1`"
    why: "`println!` already takes its arguments by reference. Adding `&` doesn't help: `s1` itself has been moved."
  - text: "Strings must be declared `mut` before they can be assigned to another variable"
    why: "`mut` controls whether you can change a binding, not whether you can move out of it."
---

## Prompt

This doesn't compile. Why, and what's the fix?

```rust
let s1 = String::from("hello");
let s2 = s1;
println!("{s1}, world");
```

## Explanation

A `String` is a pointer, length and capacity on the stack plus a buffer on the heap. `let s2 = s1;` copies the stack part and **moves** ownership: Rust then treats `s1` as invalid, so only `s2` will free the buffer when it goes out of scope. That rule is how Rust frees memory at a known point without a garbage collector and without double frees. If you really need two independent strings, call `s1.clone()`, which copies the heap data too.
