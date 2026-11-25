---
title: "What streaming actually speeds up"
module: ai
type: mcq
source: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency"
tags: ["llm", "streaming", "latency"]
stack: ["anthropic"]
choices:
  - text: "Total generation time drops, because tokens are produced in parallel"
    why: "The model still generates tokens one after another. Streaming sends them as they are made; it doesn't make more of them faster."
  - text: "It lowers the bill, because you pay per chunk rather than per token"
    why: "Billing is by input and output tokens either way."
  - text: "Users see text after the time to first token instead of waiting for the whole reply; the total time is about the same"
    correct: true
    why: "Perceived responsiveness is the win. It also lets you update the UI or start other work while the rest arrives."
  - text: "It makes replies deterministic, because each chunk is fixed once sent"
    why: "Streaming changes delivery, not sampling."
---

## Prompt

A chat UI shows a spinner for 15 seconds, then the whole answer at once. What does turning on streaming change?
