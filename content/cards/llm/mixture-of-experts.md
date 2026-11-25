---
title: "What mixture of experts saves, and what it doesn't"
module: llm
type: mcq
source: "https://huggingface.co/blog/moe"
tags: ["llm", "mixture-of-experts", "inference"]
stack: ["huggingface"]
choices:
  - text: "It needs the memory of a 12B model, because only 12B parameters are used per token"
    why: "The router may pick any expert for the next token, so every expert has to stay loaded."
  - text: "It needs 56B parameters of memory, because it's eight 7B models"
    why: "Only the feed-forward layers are replicated per expert. Attention and other layers are shared, which is why the total is about 47B, not 56B."
  - text: "Compute per token is like a dense model of about 12B, but all about 47B parameters must be held in memory"
    correct: true
    why: "A learned router sends each token to two experts in each MoE layer, so only part of the network runs per token. Memory is the price: every expert stays loaded."
  - text: "Each expert covers a topic such as code or maths, so you can load only the experts you need"
    why: "Routing happens per token at every MoE layer, so one reply touches many experts. You can't drop the rest ahead of time."
---

## Prompt

Mixtral 8x7B has about 47B parameters in total but uses about 12B per token. What does that mean when you run it?
