---
title: "A slice copy and a nested list"
module: python
type: what-prints
source: "https://docs.python.org/3/library/copy.html"
tags: ["python", "copying", "lists"]
stack: ["python"]
---

## Prompt

What prints?

```python
import copy

grid = [[0, 0], [0, 0]]
shallow = grid[:]
deep = copy.deepcopy(grid)

shallow[0][0] = 1
shallow.append([9])

print(grid)
print(deep)
```

## Answer

```text
[[1, 0], [0, 0]]
[[0, 0], [0, 0]]
```

## Explanation

`grid[:]` makes a shallow copy: a new outer list holding references to the same inner lists. Changing `shallow[0][0]` changes the inner list `grid` also holds, but appending to `shallow` only changes the new outer list. `deepcopy` copies recursively, so nothing is shared.
