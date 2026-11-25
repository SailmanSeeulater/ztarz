---
title: "Reading a confusion matrix"
module: ml
type: what-prints
source: "https://scikit-learn.org/stable/modules/generated/sklearn.metrics.confusion_matrix.html"
tags: ["metrics", "confusion-matrix", "precision-recall"]
stack: ["scikitlearn", "python"]
---

## Prompt

What prints? (1 = spam.)

```python
from sklearn.metrics import confusion_matrix, precision_score, recall_score

y_true = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
y_pred = [1, 1, 0, 0, 1, 0, 0, 0, 0, 0]
print(confusion_matrix(y_true, y_pred))
print(precision_score(y_true, y_pred), recall_score(y_true, y_pred))
```

## Answer

```text
[[5 1]
 [2 2]]
0.6666666666666666 0.5
```

## Explanation

In scikit-learn, rows are the true class and columns the predicted class, in label order 0 then 1. So the layout is `[[TN, FP], [FN, TP]]`: 5 true negatives, 1 false positive, 2 false negatives, 2 true positives.

- **Precision** = TP / (TP + FP) = 2 / 3: of the emails flagged, how many were spam.
- **Recall** = TP / (TP + FN) = 2 / 4: of the real spam, how much was caught.

Other libraries and textbooks sometimes put the positive class first, so check the axes before reading one.
