---
title: "Decision tree vs random forest"
module: ml
type: comparison
source: "https://scikit-learn.org/stable/modules/ensemble.html"
tags: ["decision-trees", "random-forest", "ensembles"]
stack: ["scikitlearn"]
---

## What it is

A **decision tree** predicts by asking a sequence of yes/no questions about features (`income > 40k?`), ending in a leaf with a prediction. A **random forest** is an ensemble of many trees, each trained a little differently, whose predictions are averaged.

## How it models the problem

A single tree greedily picks the split that best separates the data at each node, and keeps going until it's told to stop. A forest adds two sources of randomness: each tree is trained on a bootstrap sample (rows drawn with replacement), and each split considers only a random subset of features (`max_features`). The trees make different errors, and averaging cancels some of them out.

## Where it shines

- **Tree:** you can read its rules and explain a prediction to a non-technical person. Fast. Handles mixed feature types.
- **Forest:** strong accuracy on tabular data with little tuning. Much less prone to overfitting than one deep tree. Gives feature importances.

## Where it bites

- **Tree:** high variance: a deep tree memorises training data, and small changes in data can produce a very different tree.
- **Forest:** hundreds of trees can't be inspected by eye, larger to store and slower to predict. Impurity-based feature importances are computed on training data and favour high-cardinality features; scikit-learn suggests permutation importance instead.

## What interviewers ask

- Why does averaging many trees help? (Reduces variance, at the cost of a slight increase in bias.)
- What's the role of bootstrapping and random feature subsets? (They make trees differ, so their errors are less correlated.)
- How does a random forest differ from gradient boosting? (Forest trees are independent and averaged; boosting trains trees one after another, each correcting the last.)
