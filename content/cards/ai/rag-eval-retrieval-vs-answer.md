---
title: "Which half of RAG is failing?"
module: ai
type: mcq
source: "https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_recall/"
tags: ["rag", "evals", "retrieval"]
choices:
  - text: "Only final-answer accuracy, because that's what users see"
    why: "It tells you that something fails but not where. A perfect prompt can't fix a passage that was never retrieved."
  - text: "The cosine score of the top chunk: above 0.8 means retrieval worked"
    why: "Similarity scores aren't calibrated relevance. A high-scoring chunk can still be the wrong one."
  - text: "Whether the passages needed for each question were retrieved (for example context recall against a reference answer), measured separately from whether the answer sticks to the passages it was given"
    correct: true
    why: "Low recall points to chunking, search or reranking. Good recall with bad answers points to the prompt or the model. You fix a different part in each case."
  - text: "Average response length and latency"
    why: "Worth tracking, but they say nothing about whether the answer is right."
---

## Prompt

A RAG bot answers 30% of a test set wrongly. Before you touch the prompt, what should you measure?
