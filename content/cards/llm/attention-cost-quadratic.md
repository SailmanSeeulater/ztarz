---
title: "Doubling the prompt and the cost of attention"
module: llm
type: mcq
source: "https://arxiv.org/html/1706.03762v7"
tags: ["llm", "attention", "context-window", "performance"]
choices:
  - text: "About 2x: twice the tokens, twice the work"
    why: "That holds for the feed-forward layers, which process each token on its own. Attention compares tokens in pairs."
  - text: "Unchanged, because attention runs in parallel on the GPU"
    why: "Parallelism changes how long it takes on the clock, not how much arithmetic is done. Bigger matrices still need more work and memory."
  - text: "About 4x: every token is scored against every other token, so the work grows with the square of the length"
    correct: true
    why: "The paper gives self-attention a cost of O(n²·d) per layer for n tokens. Double n and the score matrix has four times as many entries. This is the main reason long contexts are expensive."
  - text: "About 8x, because there are queries, keys and values"
    why: "Q, K and V are each linear in the length. The square comes from comparing every query with every key."
---

## Prompt

You double a prompt from 50,000 to 100,000 tokens. Roughly how much more work does the self-attention step do on it?
