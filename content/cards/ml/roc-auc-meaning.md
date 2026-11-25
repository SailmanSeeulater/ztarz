---
title: "What ROC AUC measures"
module: ml
type: concept
source: "https://developers.google.com/machine-learning/crash-course/classification/roc-and-auc"
tags: ["metrics", "roc-auc", "classification"]
---

## Prompt

What does an ROC AUC of 0.85 mean, what does 0.5 mean, and when is it the wrong metric to lean on?

## Answer

The ROC curve plots true positive rate against false positive rate as you slide the classification threshold from strict to lenient. AUC is the area under it.

- **0.85:** pick a random positive and a random negative; 85% of the time the model gives the positive a higher score. It measures ranking quality across all thresholds.
- **0.5:** no better than a coin flip (the diagonal line). 1.0 is perfect ranking.

Caveats: AUC doesn't pick a threshold for you, and you still need one to ship. On heavily imbalanced data it can look flattering, and a precision-recall curve often compares models better.
