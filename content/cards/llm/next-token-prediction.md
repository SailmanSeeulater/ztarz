---
title: "What an LLM is trained to do"
module: llm
type: concept
source: "https://huggingface.co/learn/llm-course/chapter1/4"
tags: ["llm", "pretraining", "generation"]
---

## Prompt

In one sentence, what is a GPT-style model trained to do? And how does that one skill turn into a whole reply?

## Answer

It is trained to predict the next token from all the tokens before it (causal language modelling). The training text supplies the right answer at every position, so pre-training needs no human labels.

To write a reply it predicts one token, appends it to the input, and predicts again, until it emits a stop token or hits a limit. A 500-token answer is 500 prediction steps, each depending on everything before it.
