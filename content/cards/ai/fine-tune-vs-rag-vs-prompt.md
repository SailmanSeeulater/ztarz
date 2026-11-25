---
title: "Which job is fine-tuning for?"
module: ai
type: mcq
source: "https://developers.openai.com/api/docs/guides/model-optimization"
tags: ["llm", "fine-tuning", "rag"]
stack: ["openai"]
choices:
  - text: "Answering questions about a pricing page that changes every week"
    why: "Facts that change belong in retrieval: update the document and re-index. A fine-tuned model would need retraining for every price change."
  - text: "Getting a small, cheap model to sort tickets into your 12 categories as reliably as a large model does with a long few-shot prompt"
    correct: true
    why: "Fine-tuning suits narrow, repeated tasks where you want consistent format and behaviour, shorter prompts, or a smaller model that's cheaper and faster per call."
  - text: "Making every answer cite which document each claim came from"
    why: "Citations need the source text in context, which is what RAG plus a clear instruction gives you."
  - text: "Finding out whether an LLM can do a new task at all"
    why: "Start with evals and prompt engineering. Prompting may be all you need, and it's much cheaper to iterate on."
---

## Prompt

Which of these problems is the best fit for fine-tuning, rather than prompting or RAG?
