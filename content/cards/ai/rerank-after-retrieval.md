---
title: "Why RAG pipelines rerank"
module: ai
type: concept
source: "https://sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html"
tags: ["rag", "reranking", "retrieval"]
stack: ["huggingface"]
---

## Prompt

What does a reranker do in a RAG pipeline, and why not use it for the whole search?

## Answer

Search runs in two stages.

1. **Retrieve** with a bi-encoder: the query and each document are embedded separately, and the document vectors are computed ahead of time. Comparing vectors is fast enough for millions of documents. Pull a broad shortlist, say the top 100.
2. **Rerank** with a cross-encoder: it reads the query and one candidate together and outputs a relevance score. Because it sees both texts at once, it judges relevance better. Keep the top few for the prompt.

A cross-encoder has to run once per query-document pair at query time, so running it over the whole corpus would be far too slow. It's only affordable on a shortlist, and it still adds some latency to each query.
