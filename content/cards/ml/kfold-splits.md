---
title: "What KFold actually splits"
module: ml
type: what-prints
source: "https://scikit-learn.org/stable/modules/cross_validation.html"
tags: ["cross-validation", "evaluation"]
stack: ["scikitlearn", "python"]
---

## Prompt

What prints?

```python
from sklearn.model_selection import KFold

for train, test in KFold(n_splits=3).split(list(range(6))):
    print(train, test)
```

## Answer

```text
[2 3 4 5] [0 1]
[0 1 4 5] [2 3]
[0 1 2 3] [4 5]
```

## Explanation

k-fold cross-validation splits the data into k folds, trains on k − 1 and tests on the remaining one, k times, then averages the scores. Every row is tested exactly once, which gives a steadier estimate than one split. `KFold` doesn't shuffle by default, so sorted data gives skewed folds: pass `shuffle=True, random_state=0`. For classification, `StratifiedKFold` keeps class ratios per fold; for time series, `TimeSeriesSplit` never trains on the future.
