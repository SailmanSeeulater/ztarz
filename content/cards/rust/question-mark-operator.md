---
title: "What ? does"
module: rust
type: mcq
source: "https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html"
tags: ["rust", "errors", "result", "option"]
stack: ["rust"]
choices:
  - text: "It panics with the error message if the value is `Err`"
    why: "That's `unwrap()` or `expect()`. `?` never panics; it hands the error back to the caller."
  - text: "It converts the `Result` into an `Option`, discarding the error"
    why: "That's `.ok()`. `?` keeps the error and returns it."
  - text: "It ignores the error and continues with a default value"
    why: "That's `unwrap_or_default()`. `?` stops the function."
  - text: "On `Ok(v)` it gives you `v`; on `Err(e)` it returns early from the current function with that error, converted through `From` if the types differ"
    correct: true
    why: "It's shorthand for a `match` that propagates the error. It only compiles in a function whose return type is compatible, such as `Result` (or `Option` for `None`)."
---

## Prompt

In `let text = fs::read_to_string(path)?;`, what does the `?` do?
