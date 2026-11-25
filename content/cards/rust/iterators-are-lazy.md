---
title: "The map that never ran"
module: rust
type: bug-hunt
source: "https://doc.rust-lang.org/book/ch13-02-iterators.html"
tags: ["rust", "iterators", "closures"]
stack: ["rust"]
choices:
  - text: "`iter()` borrows the vector, so the closure can't see the items"
    why: "The closure receives each item fine, once the iterator is actually driven."
  - text: "Closures can't call macros like `println!`"
    why: "They can. The closure just never runs."
  - text: "Iterator adapters like `map` are lazy; nothing runs until something consumes the iterator, such as `for`, `collect()` or `for_each()`"
    correct: true
    why: "`map` only builds a new iterator. The compiler even warns: \"iterators are lazy and do nothing unless consumed\"."
  - text: "`map` only runs on `into_iter()`, not on `iter()`"
    why: "Both produce iterators, and both are lazy in the same way."
---

## Prompt

This prints nothing. Why?

```rust
let v = vec![1, 2, 3];
v.iter().map(|x| println!("{x}"));
```

## Explanation

Iterators in Rust are lazy: `map`, `filter` and friends wrap the iterator and describe work without doing it. A consuming method pulls items through the chain. For side effects, write a `for` loop (or `for_each`); to build a new collection, end with `.collect::<Vec<_>>()`. Laziness is what lets a chain like `iter().filter().map().take(3)` stop early and compile down to a plain loop.
