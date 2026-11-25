---
title: "Supervised vs unsupervised learning"
module: ml
type: out-loud
source: "https://developers.google.com/machine-learning/intro-to-ml/what-is-ml"
tags: ["ml-basics", "supervised", "unsupervised"]
---

## Prompt

Explain the difference between supervised and unsupervised learning, with an example of each from a typical product. About 60 seconds.

## Model answer

The difference is whether the training data comes with the right answers.

**Supervised learning** trains on labelled examples: inputs paired with the answer you want. The model learns the mapping, then predicts for new inputs. Two flavours:

- **Regression** predicts a number: delivery time, house price.
- **Classification** predicts a category: is this email spam, will this customer cancel.

**Unsupervised learning** gets data with no answers and looks for structure. The common case is **clustering**: grouping customers by behaviour into segments nobody defined in advance.

How to choose: if you have, or can cheaply get, labels for the thing you care about, it's supervised. If you're exploring and don't yet know what the groups are, start unsupervised, and check whether the clusters mean anything to a human.
