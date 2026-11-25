---
title: "Why three splits: train, validation, test"
module: ml
type: concept
source: "https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets"
tags: ["evaluation", "data-splits"]
---

## Prompt

Why split data into training, validation and test sets, rather than just train and test?

## Answer

- **Training set:** the model learns its parameters from it.
- **Validation set:** you evaluate on it while making choices: features, model type, hyperparameters. Every tweak based on its score tunes you to it a little.
- **Test set:** touched once, at the end, to estimate how the final model does on data that influenced nothing.

With only two splits, the test set gets used for those decisions and gradually stops being unseen, so its score turns optimistic. Even a validation set "wears out" with repeated use; Google's crash course suggests collecting fresh data to refresh it. All splits should come from the same distribution as real traffic.
