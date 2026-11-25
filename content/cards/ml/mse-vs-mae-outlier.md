---
title: "One outlier: MSE vs MAE"
module: ml
type: what-prints
source: "https://developers.google.com/machine-learning/crash-course/linear-regression/loss"
tags: ["loss-functions", "regression", "outliers"]
stack: ["scikitlearn", "python"]
---

## Prompt

The model is perfect except for one prediction that's off by 10. What prints?

```python
from sklearn.metrics import mean_squared_error, mean_absolute_error

y_true = [3, 3, 3, 3]
y_pred = [3, 3, 3, 13]
print(mean_squared_error(y_true, y_pred))
print(mean_absolute_error(y_true, y_pred))
```

## Answer

```text
25.0
2.5
```

## Explanation

MSE squares each error: 10² / 4 = 25. MAE takes absolute values: 10 / 4 = 2.5. Squaring makes big errors dominate, so a model trained on MSE moves towards outliers, while MAE stays closer to the bulk of the data. Pick MSE when big misses are disproportionately bad, MAE when outliers are noise you don't want to chase. Classification uses log loss (cross-entropy) instead.
