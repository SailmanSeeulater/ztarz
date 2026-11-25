---
title: "The default list that remembers"
module: python
type: what-prints
source: "https://docs.python.org/3/tutorial/controlflow.html#default-argument-values"
tags: ["python", "functions", "gotcha"]
stack: ["python"]
---

## Prompt

What prints?

```python
def add_tag(tag, tags=[]):
    tags.append(tag)
    return tags

print(add_tag("a"))
print(add_tag("b"))
```

## Answer

```text
['a']
['a', 'b']
```

## Explanation

A default value is evaluated once, when the `def` runs, not on each call. Every call that omits `tags` shares the same list, so it keeps growing. Use `tags=None` and create the list inside: `if tags is None: tags = []`.
