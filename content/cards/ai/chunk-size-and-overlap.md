---
title: "What chunk overlap is for"
module: ai
type: mcq
source: "https://docs.langchain.com/oss/python/langchain/chunking"
tags: ["rag", "chunking", "retrieval"]
stack: ["langchain"]
choices:
  - text: "It makes each chunk bigger, so its embedding covers more topics"
    why: "Bigger chunks carry more context, but their embeddings blur several topics together and match less precisely. That's the opposite of what overlap is for."
  - text: "It removes near-duplicate chunks before indexing"
    why: "Overlap adds a little repetition on purpose. Deduplication is a separate step."
  - text: "It makes the retriever return the neighbouring chunks as well"
    why: "Fetching neighbours or a parent section is a separate retrieval technique. Overlap only changes how the text is cut."
  - text: "It repeats the end of each chunk at the start of the next, so an idea that crosses a boundary is whole in at least one chunk. A common starting point is 10 to 20% of the chunk size"
    correct: true
    why: "Without overlap, a step split across two chunks may match the query in neither. Tune size and overlap on your own documents and questions; there is no universal best."
---

## Prompt

You split docs into 1,000-character chunks with no overlap. Answers keep missing steps that sit across two chunks. What does chunk overlap do?
