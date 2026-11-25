---
title: "L1 vs L2 regularisation"
module: ml
type: mcq
source: "https://scikit-learn.org/stable/modules/linear_model.html"
tags: ["regularisation", "linear-models"]
stack: ["scikitlearn"]
choices:
  - text: "L2 (Ridge), because squaring the weights pushes small ones to zero"
    why: "L2 shrinks all weights towards zero but rarely makes any exactly zero, so every feature stays in the model."
  - text: "Neither: regularisation only changes the learning rate"
    why: "Regularisation adds a penalty on weight size to the loss. The learning rate is a separate setting for gradient descent."
  - text: "L1 (Lasso), because its penalty can set coefficients exactly to zero"
    correct: true
    why: "Lasso produces sparse models, so it doubles as feature selection. `alpha` sets the strength: larger alpha, more coefficients at zero."
  - text: "Either, as long as you raise `C` in LogisticRegression"
    why: "In scikit-learn's LogisticRegression, `C` is the inverse of regularisation strength. Raising it weakens the penalty."
---

## Prompt

You have 500 features and suspect most are useless. Which regularisation helps the model drop them, and why?
