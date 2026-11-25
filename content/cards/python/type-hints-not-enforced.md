---
title: "What a type hint does at runtime"
module: python
type: mcq
source: "https://docs.python.org/3/library/typing.html"
tags: ["python", "typing", "mypy"]
stack: ["python"]
choices:
  - text: "Raises a TypeError, because `\"ab\"` isn't an int"
    why: "The runtime doesn't check annotations at all. That's a job for a static checker before the code runs."
  - text: "Converts `\"ab\"` to an int first"
    why: "Annotations never convert values. Python has no implicit coercion here."
  - text: "Returns `'abab'`; a checker like mypy would flag the call before you run it"
    correct: true
    why: "Annotations are stored as metadata for tools such as type checkers, IDEs and linters. At runtime `\"ab\" * 2` is just string repetition."
  - text: "Prints a warning, then returns `'abab'`"
    why: "No warning either. Unless you run a checker or a validation library, nothing reads the hints."
---

## Prompt

What happens when this runs?

```python
def double(n: int) -> int:
    return n * 2

print(double("ab"))
```
