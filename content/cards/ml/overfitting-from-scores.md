---
title: "Diagnosing overfitting from two scores"
module: ml
type: mcq
source: "https://en.wikipedia.org/wiki/Bias%E2%80%93variance_tradeoff"
tags: ["overfitting", "bias-variance", "evaluation"]
choices:
  - text: "Underfitting (high bias): make the model bigger"
    why: "An underfit model scores badly on the training data too. 99% on training means it can fit the data, too well in fact."
  - text: "Overfitting (high variance): simplify, regularise or get more data"
    correct: true
    why: "It has learned noise specific to the training set, so it doesn't generalise. A big train/validation gap is the signature. Shallower trees, regularisation, more data or early stopping all help."
  - text: "A good fit: validation is always lower than training"
    why: "A small gap is normal. 29 points is not."
  - text: "Data leakage: the validation score is inflated"
    why: "Leakage inflates validation scores, making them look too good. Here validation is the poor one."
---

## Prompt

A deep decision tree scores 99% accuracy on training data and 70% on validation. What's going on, and what helps?
