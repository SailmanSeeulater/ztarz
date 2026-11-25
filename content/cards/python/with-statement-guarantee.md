---
title: "What with guarantees when the body raises"
module: python
type: mcq
source: "https://docs.python.org/3/reference/compound_stmts.html#the-with-statement"
tags: ["python", "context-managers", "exceptions"]
stack: ["python"]
choices:
  - text: "The exception is swallowed, because the with block handles it"
    why: "`__exit__` only suppresses it if it returns a true value. File objects return False, so the exception carries on."
  - text: "`__exit__` runs and the file is closed, then the exception carries on to the caller"
    correct: true
    why: "Once `__enter__` succeeds, `__exit__` always runs, on success or on an exception. It works like a try/finally you can't forget to write."
  - text: "The file is closed only if the block finishes without an error"
    why: "That's what you'd get with a bare `f.close()` at the end. Cleaning up on errors is the reason to use `with`."
  - text: "The file is closed later, when the object is garbage-collected"
    why: "That's the risk without `with`. The with statement closes it as soon as the block exits."
---

## Prompt

What does `with` guarantee if the code inside raises?

```python
with open("orders.csv") as f:
    rows = parse(f)  # raises ValueError
```
