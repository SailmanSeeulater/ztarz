---
title: "Why models state wrong facts confidently"
module: llm
type: out-loud
source: "https://openai.com/index/why-language-models-hallucinate/"
tags: ["llm", "hallucination", "training"]
stack: ["openai"]
---

## Prompt

Without talking about prompts or RAG, explain why a language model confidently states things that are false. What in training causes it?

## Model answer

Two causes, one from pre-training and one from how models are graded.

1. **Pre-training learns what fluent text looks like, not what's true.** The model predicts the next word over huge amounts of text that carries no true or false labels. Regular patterns like spelling are learned reliably as models grow. Arbitrary, rarely seen facts, like one person's birthday, follow no pattern, so the model produces something plausible in their place.
2. **Evaluations reward guessing.** Most benchmarks score accuracy alone. Like a multiple-choice exam with no penalty for wrong answers, a guess sometimes scores and "I don't know" never does. Optimising for those scores teaches the model to guess confidently.

The proposed fix is to penalise confident errors more than expressions of uncertainty, so abstaining stops being a losing move. Until then, treat fluency as no evidence of accuracy.
