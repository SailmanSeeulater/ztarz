---
title: "How pandas treats missing values"
module: data
type: what-prints
source: "https://pandas.pydata.org/docs/user_guide/missing_data.html"
tags: ["pandas", "missing-values", "nan"]
stack: ["pandas", "python"]
---

## Prompt

What prints?

```python
import pandas as pd

s = pd.Series([1.0, None, 3.0])
print(s.mean(), s.sum(), s.count(), len(s))
print(float("nan") == float("nan"))
print(s.isna().sum())
```

## Answer

```text
2.0 4.0 2 3
False
1
```

## Explanation

`None` becomes `NaN`. Reductions skip missing values by default, so the mean is (1 + 3) / 2, not over three rows, and `count` counts only non-missing values while `len` counts rows. NaN is never equal to anything, itself included, so `s == float("nan")` finds nothing. Use `isna()`. Silently skipping NaN can hide a data problem: check how much is missing before deciding to drop, fill or flag it.
