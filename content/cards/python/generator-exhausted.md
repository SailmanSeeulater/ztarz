---
title: "Summing a generator twice"
module: python
type: what-prints
source: "https://docs.python.org/3/howto/functional.html#generator-expressions-and-list-comprehensions"
tags: ["python", "generators", "iterators"]
stack: ["python"]
---

## Prompt

What prints?

```python
squares = (n * n for n in range(4))
print(sum(squares))
print(sum(squares))
```

## Answer

```text
14
0
```

## Explanation

The parentheses make a generator expression: an iterator that computes values lazily, one at a time. The first `sum` consumes all of them (0 + 1 + 4 + 9). An iterator only moves forward, so the second `sum` sees nothing and returns 0. Use square brackets for a list if you need to go over the values more than once.
