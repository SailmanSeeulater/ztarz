---
title: "Box, Rc, Arc and RefCell"
module: rust
type: out-loud
source: "https://doc.rust-lang.org/std/rc/index.html"
tags: ["rust", "smart-pointers", "interior-mutability"]
stack: ["rust"]
---

## Prompt

When would you reach for `Box<T>`, `Rc<T>`, `Arc<T>` and `RefCell<T>`?

## Model answer

- **`Box<T>`**: one owner, value on the heap. Use it for recursive types like a linked list node, for big values you want to move cheaply, or for `Box<dyn Trait>`.
- **`Rc<T>`**: shared ownership in one thread. Cloning bumps a reference count; the value is dropped when the last `Rc` goes. You only get shared (`&`) access.
- **`Arc<T>`**: the same, but the count is updated atomically, so it can be shared between threads. It costs a little more, which is why `Rc` exists.
- **`RefCell<T>`**: interior mutability. It lets you mutate through a shared reference by checking the borrowing rules at runtime instead of compile time; break them and it panics.

They combine: `Rc<RefCell<T>>` is shared, mutable data in one thread. Across threads the equivalent is `Arc<Mutex<T>>`.
