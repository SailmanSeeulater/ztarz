---
title: "What *args and **kwargs receive"
module: python
type: mcq
source: "https://docs.python.org/3/tutorial/controlflow.html#arbitrary-argument-lists"
tags: ["python", "functions", "arguments"]
stack: ["python"]
choices:
  - text: "`[1, 2] {'level': 'info'}`"
    why: "Extra positional arguments are packed into a tuple, not a list."
  - text: "`(1, 2, 'info') {}`"
    why: "Keyword arguments that don't match a named parameter go into the `**` dict, with their names as keys."
  - text: "A TypeError, because `level` isn't a declared parameter"
    why: "`**kwargs` exists to accept keyword arguments the function didn't name."
  - text: "`(1, 2) {'level': 'info'}`"
    correct: true
    why: "`*args` collects extra positional arguments into a tuple; `**kwargs` collects extra keyword arguments into a dict. The names are convention; the `*` and `**` do the work."
---

## Prompt

What does this print?

```python
def log(*args, **kwargs):
    print(args, kwargs)

log(1, 2, level="info")
```
