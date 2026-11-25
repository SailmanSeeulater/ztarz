---
title: "Why Rc can't cross threads"
module: rust
type: mcq
source: "https://doc.rust-lang.org/book/ch16-04-extensible-concurrency-sync-and-send.html"
tags: ["rust", "concurrency", "send", "sync"]
stack: ["rust"]
choices:
  - text: "`Rc<T>` isn't `Send`: its reference count isn't updated atomically, so two threads cloning it could corrupt the count. Use `Arc<T>`"
    correct: true
    why: "`Send` marks types whose ownership can move to another thread. The compiler checks it, so the mistake is a compile error, not a race."
  - text: "Threads can't share heap data in Rust; copy the value instead"
    why: "They can, through types such as `Arc<T>` and `Mutex<T>` that are safe to share."
  - text: "`thread::spawn` needs a `move` closure, and adding `move` fixes it"
    why: "`move` transfers ownership into the closure, but the value still has to be `Send`. `Rc` isn't, with or without `move`."
  - text: "The program compiles but may crash, because Rust doesn't check thread safety"
    why: "Rust does check it, at compile time, through the `Send` and `Sync` marker traits."
---

## Prompt

You try to move an `Rc<Mutex<i32>>` into `thread::spawn`. The compiler refuses. Why?
