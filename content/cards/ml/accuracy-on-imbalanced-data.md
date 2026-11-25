---
title: "99% accuracy on fraud detection"
module: ml
type: mcq
source: "https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall"
tags: ["metrics", "imbalanced-classes", "precision-recall"]
choices:
  - text: "Ship it: 99% is excellent"
    why: "A model that answers 'not fraud' for everything also scores 99% here, and catches nothing."
  - text: "Check recall and precision on the fraud class"
    correct: true
    why: "Recall: what share of real fraud was caught. Precision: what share of flags were real fraud. With 1% positives, accuracy is dominated by the easy negatives. F1, their harmonic mean, is a better single number."
  - text: "Check accuracy on the training set too"
    why: "Comparing train and validation finds overfitting, but both can be 99% for a model that never flags fraud."
  - text: "Use mean squared error instead"
    why: "MSE is a regression loss. It doesn't tell you which class the errors fall in."
---

## Prompt

1% of transactions are fraudulent. A new model reports 99% accuracy. What should you check before celebrating?
