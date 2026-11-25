---
title: "Making a slow LLM feature faster"
module: ai
type: out-loud
source: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency"
tags: ["llm", "latency", "performance"]
stack: ["claude"]
---

## Prompt

A support assistant takes nine seconds to reply. How would you make it faster without quietly making it worse?

## Model answer

First, measure two numbers: time to first token, and total time. And keep an eval set, so every speed change is checked against quality. Get a prompt that works well first, then tune for speed.

Then I'd pull these levers, re-running the evals after each:

1. **Smaller or faster model**, or a lower effort setting where the model has one. This is often the biggest single win.
2. **Fewer tokens.** Trim the prompt, ask for shorter answers (a sentence or paragraph count works better than a word count), and set a sensible `max_tokens`. Fewer tokens in and out means less time.
3. **Stream the reply**, so the user reads text after the first token rather than waiting for the last one.
4. **Fix the shape of the work.** If the feature makes several model calls in a row and some don't depend on each other, run those in parallel.

I'd change one thing at a time, so I know what each one bought and what it cost.
