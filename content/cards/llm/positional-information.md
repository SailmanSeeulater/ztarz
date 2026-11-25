---
title: "Why transformers need position information"
module: llm
type: mcq
source: "https://arxiv.org/html/1706.03762v7"
tags: ["llm", "transformer", "positional-encoding"]
choices:
  - text: "To mark where the context window ends"
    why: "The input's length is known. Position encodings describe where each token sits, not where the input stops."
  - text: "Attention alone has no sense of order, so \"dog bites man\" and \"man bites dog\" would look like the same bag of tokens"
    correct: true
    why: "With no recurrence or convolution, nothing in attention knows which token came first. The original paper adds a sine and cosine pattern for each position to the token embeddings; later models use other schemes, but the job is the same."
  - text: "To make attention cheaper by skipping distant tokens"
    why: "Position encodings add information; they don't remove any work. Attention still compares every pair of tokens."
  - text: "To tell the model which tokens are words and which are punctuation"
    why: "That comes from the token embeddings themselves. Position says where, not what."
---

## Prompt

Self-attention already compares every token with every other token. Why does a transformer also need positional encodings?
