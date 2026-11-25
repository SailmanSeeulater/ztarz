---
title: "Set operations as a Venn diagram"
module: math
type: what-prints
source: "https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset"
tags: ["sets", "venn"]
stack: ["python"]
---

## Prompt

`a` is who used the old checkout, `b` who used the new one. What prints?

```python
a = {"alice", "bob", "carol"}
b = {"bob", "dave"}
print(sorted(a & b))
print(sorted(a | b))
print(sorted(a - b))
print(sorted(a ^ b))
```

## Answer

```text
['bob']
['alice', 'bob', 'carol', 'dave']
['alice', 'carol']
['alice', 'carol', 'dave']
```

## Explanation

On a Venn diagram: `&` (intersection) is the overlap, `|` (union) is both circles, `-` (difference) is `a`'s circle minus the overlap, and `^` (symmetric difference) is both circles minus the overlap. `sorted` is there because sets have no order. The same ideas map to SQL: `INTERSECT`, `UNION`, `EXCEPT`.
