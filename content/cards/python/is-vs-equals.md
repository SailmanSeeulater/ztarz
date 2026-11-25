---
title: "is versus =="
module: python
type: mcq
source: "https://docs.python.org/3/reference/expressions.html#is-not"
tags: ["python", "identity", "equality"]
stack: ["python"]
choices:
  - text: "`True True`, because Python reuses identical small lists"
    why: "Each list display builds a new list object. CPython caches some small integers, but that's an implementation detail you must not rely on, and it never applies to lists."
  - text: "`True False`; use `is` only for identity checks such as `x is None`"
    correct: true
    why: "`==` compares values; `is` is true only if both names refer to the same object. They're equal lists but two separate objects."
  - text: "`False False`, because they're different objects"
    why: "`==` on lists compares the elements in order, and these match."
  - text: "`True False`; `is` is the faster way to compare numbers and strings"
    why: "It's faster because it checks something else. `x is 1000` can be False for equal numbers, and comparing to a literal with `is` gives a SyntaxWarning."
---

## Prompt

What does this print, and when should you use `is`?

```python
a = [1, 2]
b = [1, 2]
print(a == b, a is b)
```
