---
title: "Revenue doubled after a merge"
module: data
type: bug-hunt
source: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.merge.html"
tags: ["pandas", "joins", "data-quality"]
stack: ["pandas", "python"]
choices:
  - text: "`merge` defaults to an outer join, which adds extra rows"
    why: "The default is `how='inner'`. An outer join adds unmatched rows, but it doesn't duplicate matched ones."
  - text: "`product_id` 1 appears twice in `products`, so order 1 matches both rows"
    correct: true
    why: "A join emits one row per matching pair, in pandas exactly as in SQL. Duplicate keys on the lookup side multiply rows. `validate='many_to_one'` would have raised a MergeError."
  - text: "`sum` double-counts because the merged index has duplicates"
    why: "`sum` adds each row once. The problem is that the row itself was duplicated by the join."
  - text: "The key columns have different dtypes, so pandas matched them twice"
    why: "Mismatched dtypes cause errors or missed matches, not duplicates. Both columns are integers here."
---

## Prompt

Orders total 150, but after joining product names the total is 250. Why?

```python
orders = pd.DataFrame({"product_id": [1, 2], "amount": [100, 50]})
products = pd.DataFrame({
    "product_id": [1, 1, 2],
    "name": ["Mug", "Mug (old)", "Pen"],
})
merged = orders.merge(products, on="product_id")
print(merged["amount"].sum())  # 250
```

## Explanation

Order 1 joins to both "Mug" rows, so its 100 is counted twice. Check row counts before and after a join, and state the expected shape:

```python
orders.merge(products, on="product_id", validate="many_to_one")
```

Then fix the lookup table so each key appears once. One difference from SQL to remember: pandas matches null keys to each other, SQL never does.
