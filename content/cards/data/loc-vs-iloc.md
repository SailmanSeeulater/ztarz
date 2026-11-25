---
title: "loc vs iloc in pandas"
module: data
type: what-prints
source: "https://pandas.pydata.org/docs/user_guide/indexing.html"
tags: ["pandas", "dataframe", "indexing"]
stack: ["pandas", "python"]
---

## Prompt

What prints?

```python
import pandas as pd

df = pd.DataFrame({"name": ["ana", "ben", "cai"]}, index=[10, 20, 30])
print(df.loc[20, "name"])
print(df.iloc[0, 0])
print(len(df.loc[10:20]), len(df.iloc[0:1]))
```

## Answer

```text
ben
ana
2 1
```

## Explanation

`.loc` selects by **label**: `20` is the index label, not position 20. `.iloc` selects by **integer position**, so `0` is the first row whatever its label. Slices differ too: a `.loc` slice includes both endpoints (labels 10 and 20), while an `.iloc` slice excludes the end like a Python list. With a default `0..n-1` index the two look the same, which is how bugs hide until the index changes after a filter or sort.
