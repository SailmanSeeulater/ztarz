---
title: "From pre-trained model to chat assistant"
module: llm
type: out-loud
source: "https://huggingface.co/blog/rlhf"
tags: ["llm", "pretraining", "fine-tuning", "rlhf"]
stack: ["huggingface"]
---

## Prompt

A model trained only to predict the next token on internet text is not a helpful assistant. What happens between that raw model and the chat model you call through an API?

## Model answer

Three stages, each using far less data than the one before.

1. **Pre-training:** next-token prediction on a huge amount of text. This is where almost all the compute goes and where the model picks up language and world knowledge. The result continues text; it doesn't follow instructions.
2. **Supervised fine-tuning (instruction tuning):** further training on a much smaller set of human-written prompts and good responses, so it learns the assistant format.
3. **RLHF:** people rank several model answers to the same prompt. A reward model is trained on those rankings to predict which answer a person would prefer. Then the language model is tuned with reinforcement learning to score well on that reward model, with a penalty for drifting too far from the original.

Fine-tuning and RLHF mostly shape behaviour and tone. Knowledge comes from pre-training, which is why neither later stage is a good way to fix a knowledge gap.
