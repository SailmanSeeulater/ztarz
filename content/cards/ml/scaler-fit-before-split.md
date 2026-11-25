---
title: "Scaling before the split"
module: ml
type: bug-hunt
source: "https://scikit-learn.org/stable/common_pitfalls.html"
tags: ["data-leakage", "preprocessing", "pipelines"]
stack: ["scikitlearn", "python"]
choices:
  - text: "`StandardScaler` should be `MinMaxScaler` for logistic regression"
    why: "Either scaler works. The problem is what data the scaler was fitted on."
  - text: "`train_test_split` needs `shuffle=True`"
    why: "It already shuffles by default. Shuffling doesn't stop test data reaching the scaler."
  - text: "The scaler was fitted on all rows, so test-set statistics leak into training"
    correct: true
    why: "The mean and standard deviation used to transform the training data include the test rows. Fit preprocessing on training data only, ideally inside a `Pipeline`."
  - text: "`fit_transform` should be called on `y` as well"
    why: "Classification labels aren't scaled. Only the features are."
---

## Prompt

The test score looks good, but the model does worse in production. What's wrong?

```python
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

X_scaled = StandardScaler().fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y)
model = LogisticRegression().fit(X_train, y_train)
print(model.score(X_test, y_test))
```

## Explanation

Anything that learns from data (scalers, imputers, PCA, feature selectors) must learn from the training split only. A pipeline makes that automatic, applies the same transform at predict time, and works with cross-validation:

```python
from sklearn.pipeline import make_pipeline

model = make_pipeline(StandardScaler(), LogisticRegression())
model.fit(X_train, y_train)          # X_train is unscaled here
print(model.score(X_test, y_test))   # scaler.transform, then predict
```

Scaling itself matters for distance- and gradient-based models, where a feature in thousands would otherwise drown out one in single digits.
