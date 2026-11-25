---
title: "RAG in 60 seconds"
module: f11
type: out-loud
source: "https://platform.claude.com/docs/en/about-claude/glossary#rag-retrieval-augmented-generation"
tags: ["llm", "rag", "retrieval"]
---

## Prompt

Explain retrieval augmented generation (RAG). Why use it, rather than fine-tuning, to keep a support bot current with your docs?

## Model answer

RAG is two steps per question.

1. **Retrieve:** search your own documents for the passages most relevant to the question, usually by comparing embeddings, sometimes with keyword search too.
2. **Generate:** put those passages in the prompt next to the question, and tell the model to answer only from them and cite which passage each claim comes from.

The model now answers from evidence in its context window instead of from memory, so it can use facts newer than its training data, and every answer can be checked against a source.

Fine-tuning further trains the model on your data, which adapts its style, format or a narrow task. It doesn't give you a lookup: you'd retrain each time a fact changed. With RAG, updating a doc means re-indexing it. The catch is that answers are only as good as what retrieval finds.
