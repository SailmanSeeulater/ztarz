---
title: "A churn model that's too good"
module: data
type: mcq
source: "https://en.wikipedia.org/wiki/Leakage_(machine_learning)"
tags: ["data-leakage", "features", "modelling"]
choices:
  - text: "Nothing: strong features are the goal"
    why: "A score that high on a messy business problem is a warning sign. The feature won't exist for the customers you need to predict."
  - text: "The model overfits; add regularisation"
    why: "Overfitting shows up as a gap between training and validation scores. Here validation is also near perfect, because the leak is in both."
  - text: "The test set is too small to trust"
    why: "A bigger test set built the same way would show the same score. The problem is the feature."
  - text: "`cancellation_reason` is only filled in after a customer churns, so it leaks the answer"
    correct: true
    why: "Leakage is training on information you won't have at prediction time. A feature recorded after the outcome is a proxy for the label."
---

## Prompt

A model predicting which customers will cancel next month scores 0.99 AUC on validation. Its top feature is `cancellation_reason`. What's wrong?
