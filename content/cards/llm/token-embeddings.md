---
title: "From token ID to vector"
module: llm
type: concept
source: "https://arxiv.org/html/1706.03762v7"
tags: ["llm", "embeddings", "transformer"]
---

## Prompt

The tokenizer turns text into integer IDs. What happens to each ID before the first transformer layer sees it?

## Answer

It's used to look up one row of a learned embedding matrix: a vector of `d_model` numbers (512 in the original Transformer paper). There is one row per token in the vocabulary.

The values start random and are trained along with every other weight, so the model learns what each token's vector should be. Positional information is then added, and the resulting vectors, not the IDs, flow through the layers.
