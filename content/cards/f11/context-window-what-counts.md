---
title: "What fills the context window"
module: f11
type: mcq
source: "https://platform.claude.com/docs/en/build-with-claude/context-windows"
tags: ["llm", "tokens", "context-window"]
stack: ["claude"]
choices:
  - text: "Only the latest user message; earlier turns are remembered separately"
    why: "Each turn's input carries the whole conversation so far, and all of it counts."
  - text: "The system prompt, every message so far (tool results and documents included), the tool definitions, and the output being generated"
    correct: true
    why: "All of it is measured in tokens, chunks of text that are often part of a word. If the input alone is over the limit, the API rejects the request; nothing is dropped unless your app trims or compacts the history."
  - text: "Everything the model was trained on"
    why: "Training data is baked into the weights. The context window is the model's working memory for this one request."
  - text: "Only the input; the reply has its own separate budget"
    why: "The output, including any thinking, shares the same window, so a long history leaves less room for the answer."
---

## Prompt

A long chat with an LLM API starts failing. What counts toward the model's context window?
