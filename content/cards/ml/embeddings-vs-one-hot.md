---
title: "Embeddings vs one-hot encoding"
module: ml
type: concept
source: "https://developers.google.com/machine-learning/crash-course/embeddings"
tags: ["embeddings", "categorical-features", "neural-networks"]
---

## Prompt

A recommender has 100,000 products as an input feature. Why use an embedding rather than one-hot encoding?

## Answer

**One-hot** gives each product its own position in a 100,000-long vector: one 1, the rest zeros. That causes two problems:

- **Size:** the first layer needs a weight per input per node, so 100,000 inputs × 256 nodes is 25.6 million weights just to read one feature. More memory, more compute, more data needed to train them.
- **No similarity:** every product is equally far from every other, so what the model learns about one coffee mug tells it nothing about another.

An **embedding** maps each product to a short dense vector, say 32 numbers, learned during training. Products used in similar ways end up close together, so the model can generalise across related items. Under the hood it's a lookup table: one learned row per product.
