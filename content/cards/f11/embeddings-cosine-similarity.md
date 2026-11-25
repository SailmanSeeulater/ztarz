---
title: "What cosine similarity tells you"
module: f11
type: mcq
source: "https://developers.google.com/machine-learning/clustering/dnn-clustering/supervised-similarity"
tags: ["llm", "embeddings", "vectors"]
choices:
  - text: "The two vectors point in almost the same direction, so the model places the texts close in meaning"
    correct: true
    why: "Cosine similarity is the cosine of the angle between two vectors: 1 means the same direction, regardless of length. For vectors normalised to length 1, it equals the dot product."
  - text: "92% of the words in the two sentences are the same"
    why: "Embeddings place texts used in similar contexts close together. A paraphrase with no shared words can score high."
  - text: "One embedding is 92% as long as the other"
    why: "Cosine ignores length entirely. The raw dot product is the measure that grows with vector length."
  - text: "The second sentence is 92% likely to be true"
    why: "Similarity says nothing about truth. A false claim can sit right next to the true one."
---

## Prompt

An embedding model turns a piece of text into a vector of numbers. Two sentences' embeddings have a cosine similarity of 0.92. What does that tell you?
