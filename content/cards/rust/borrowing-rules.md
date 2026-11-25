---
title: "The borrowing rule"
module: rust
type: mcq
source: "https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html"
tags: ["rust", "borrowing", "references"]
stack: ["rust"]
choices:
  - text: "Any number of `&mut` references, as long as there are no `&` references"
    why: "Two live `&mut` to the same value is exactly what the rule forbids: both could write at once."
  - text: "Any number of `&` and `&mut` references, as long as they are in different functions"
    why: "The rule applies wherever the references are live, across function calls too."
  - text: "Either one `&mut` reference or any number of `&` references, never both at the same time"
    correct: true
    why: "Many readers or one writer. This rules out data races at compile time."
  - text: "Only one reference of either kind at a time"
    why: "Too strict. Any number of shared `&` references can coexist, because none of them can change the value."
---

## Prompt

At any given moment, which references to a single value does the Rust compiler allow?
