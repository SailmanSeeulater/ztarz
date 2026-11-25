---
title: "A dict comprehension with repeated keys"
module: python
type: what-prints
source: "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
tags: ["python", "comprehensions", "dict"]
stack: ["python"]
---

## Prompt

What prints?

```python
print({n % 3: n for n in range(6)})
```

## Answer

`{0: 3, 1: 4, 2: 5}`

## Explanation

The comprehension runs `d[n % 3] = n` for n from 0 to 5. Keys repeat (0 and 3 both give 0), and storing under an existing key replaces the old value, so the last write wins. No error, no warning: if keys can collide, decide whether you want the first, the last, or a list of all.
