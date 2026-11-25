---
title: "Inside one transformer layer"
module: llm
type: concept
source: "https://arxiv.org/html/1706.03762v7"
tags: ["llm", "transformer", "architecture"]
---

## Prompt

What are the two sub-layers in a transformer layer, what does each do, and what wraps each of them?

## Answer

1. **Multi-head self-attention:** mixes information across tokens.
2. **Position-wise feed-forward network:** the same small two-layer network applied to each token's vector on its own.

Each sub-layer has a residual connection around it followed by layer normalisation: `LayerNorm(x + Sublayer(x))`. The residual lets the input pass straight through, which keeps deep stacks trainable. A model is a stack of these identical layers (6 in the original paper's encoder, far more in today's LLMs).
