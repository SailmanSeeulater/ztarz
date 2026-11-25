---
title: "groupby: split, apply, combine"
module: data
type: what-prints
source: "https://pandas.pydata.org/docs/user_guide/groupby.html"
tags: ["pandas", "groupby", "aggregation"]
stack: ["pandas", "python"]
---

## Prompt

What prints?

```python
import pandas as pd

sales = pd.DataFrame({
    "city": ["Leeds", "York", "Leeds", "York", "Leeds"],
    "amount": [10, 5, 20, 5, 30],
})
print(sales.groupby("city")["amount"].agg(["sum", "count"]))
```

## Answer

```text
       sum  count
city
Leeds   60      3
York    10      2
```

## Explanation

groupby **splits** the rows by `city`, **applies** each function to every group's `amount`, and **combines** the results into one row per group. The group keys become the index. Passing a list to `agg` gives one column per function. It's the same idea as SQL's `SELECT city, SUM(amount), COUNT(amount) ... GROUP BY city`.
