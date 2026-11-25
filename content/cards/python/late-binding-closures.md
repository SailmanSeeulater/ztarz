---
title: "Every handler says error"
module: python
type: bug-hunt
source: "https://docs.python.org/3/faq/programming.html#why-do-lambdas-defined-in-a-loop-with-different-values-all-return-the-same-result"
tags: ["python", "closures", "gotcha"]
stack: ["python"]
choices:
  - text: "Replace the lambda with a `def` inside the loop"
    why: "A nested `def` closes over `level` the same way. It has the same bug."
  - text: "Capture the current value as a default: `lambda msg, level=level: f\"[{level}] {msg}\"`"
    correct: true
    why: "A default is evaluated when the lambda is created, so each handler keeps its own level."
  - text: "Iterate over a tuple instead of a list"
    why: "The container doesn't matter. The problem is when `level` is looked up."
  - text: "Python reuses the last lambda object; build the list with `copy`"
    why: "There are three distinct lambda objects. They all read the same variable."
---

## Prompt

This prints `[error] disk ok` instead of `[info] disk ok`. What's the fix?

```python
handlers = []
for level in ["info", "warn", "error"]:
    handlers.append(lambda msg: f"[{level}] {msg}")

print(handlers[0]("disk ok"))
```

## Explanation

The lambda doesn't store `level`'s value; it looks the variable up in the enclosing scope when it's called. By then the loop has finished and `level` is `"error"`. Binding it as a default argument freezes the value at creation time. The same applies to regular nested functions, not only lambdas.
