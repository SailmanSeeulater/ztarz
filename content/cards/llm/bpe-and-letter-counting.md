---
title: "Why a model miscounts letters"
module: llm
type: mcq
source: "https://huggingface.co/learn/llm-course/chapter6/5"
tags: ["llm", "tokenisation", "bpe"]
stack: ["huggingface"]
choices:
  - text: "The temperature is too high, so it picks a random count"
    why: "Even with greedy decoding the model often gets this wrong. The problem is in what it sees, not how it samples."
  - text: "The word is rare, so it never appeared in the training data"
    why: "Common words fail too. A frequent word is more likely to be a single token, which hides its letters even more."
  - text: "It reads subword tokens, not letters: BPE merges frequent character sequences into single tokens, so the word arrives as a few token IDs"
    correct: true
    why: "BPE starts from characters and repeatedly merges the most frequent adjacent pair into a new token. The model receives IDs for chunks like \"straw\" and \"berry\" (the exact split depends on the tokenizer), and has to have learned which letters each chunk contains."
  - text: "Its context window is too small to hold a whole word"
    why: "A word is a handful of tokens out of thousands. Context size has nothing to do with it."
---

## Prompt

Asked how many r's are in "strawberry", a capable model answers 2. What's the most likely underlying reason?
