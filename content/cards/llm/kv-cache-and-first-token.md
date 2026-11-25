---
title: "Why the first token takes longest"
module: llm
type: mcq
source: "https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)#KV_caching"
tags: ["llm", "kv-cache", "latency", "inference"]
choices:
  - text: "The model plans the whole answer during the pause, then streams it out"
    why: "It generates one token at a time. Nothing after the first token exists yet when the first one is sent."
  - text: "Prefill: one forward pass over the whole prompt computes the keys and values for every token at every layer and stores them in the KV cache; after that, each new token only computes its own and attends to the cache"
    correct: true
    why: "Earlier tokens' keys and values never change, so caching them avoids recomputing them on every step. The cost is memory: the cache grows with every token in the context."
  - text: "Converting 20,000 tokens of text into IDs is slow"
    why: "Tokenising is a cheap lookup next to running every layer of the model over the prompt."
  - text: "The KV cache has to be downloaded from storage before generation starts"
    why: "The cache is built in memory from the prompt during this request; it is the result of the pause, not a download."
---

## Prompt

You stream a reply to a 20,000-token prompt. There's a noticeable pause before the first token, then tokens arrive at a steady pace. What explains that shape?
