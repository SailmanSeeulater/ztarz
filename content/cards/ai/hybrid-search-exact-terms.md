---
title: "Vector search can't find ERR_4012"
module: ai
type: mcq
source: "https://github.com/pgvector/pgvector#hybrid-search"
tags: ["rag", "hybrid-search", "full-text-search"]
stack: ["pgvector", "postgresql"]
choices:
  - text: "Switch to a larger embedding model"
    why: "A better embedding still matches by meaning. Rare exact tokens such as error codes, SKUs and names are where keyword search does better."
  - text: "Run keyword search (Postgres full-text) alongside the vector search and merge the two rankings, for example with Reciprocal Rank Fusion"
    correct: true
    why: "Keyword search catches the exact string, vectors catch paraphrases. Fusing the ranked lists, or reranking them with a cross-encoder, gives you both."
  - text: "Lower the similarity threshold so more results come back"
    why: "You get more loosely related pages, and the exact match is still not ranked first."
  - text: "Use larger chunks so the code appears in more of them"
    why: "Larger chunks blur topics and dilute the one line that names the code."
---

## Prompt

Users search the help centre for `ERR_4012`. Embedding search returns general error-handling pages instead of the one page that names that code. What's the best fix?
