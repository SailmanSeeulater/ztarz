---
title: "The dataclass that won't define"
module: python
type: bug-hunt
source: "https://docs.python.org/3/library/dataclasses.html#mutable-default-values"
tags: ["python", "dataclasses", "gotcha"]
stack: ["python"]
choices:
  - text: "Write `items: list = list()` instead of `[]`"
    why: "That's still one list built once at class definition and shared. The dataclass check rejects it with the same ValueError."
  - text: "Add `frozen=True` to the decorator"
    why: "Frozen stops reassigning fields after creation. It doesn't change the default check, which still raises."
  - text: "Nothing; it works and each Cart gets its own list"
    why: "It raises ValueError as soon as the class is defined. Without that check, every Cart would share one list, the same trap as a mutable default argument."
  - text: "Use `items: list = field(default_factory=list)`"
    correct: true
    why: "`default_factory` is called for each new instance, so every Cart gets a fresh list."
---

## Prompt

Importing this module fails with `ValueError: mutable default <class 'list'> for field items is not allowed`. What's the fix?

```python
from dataclasses import dataclass

@dataclass
class Cart:
    owner: str
    items: list = []
```

## Explanation

`@dataclass` writes `__init__`, `__repr__` and `__eq__` for you, and uses the default in the generated `__init__`. A list default would be shared by every instance, so the decorator refuses unhashable defaults outright. `field(default_factory=list)` builds a new one per instance.
