---
title: "What to record for each LLM call"
module: ai
type: concept
source: "https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/client-inference.md"
tags: ["llm", "observability", "tracing"]
stack: ["opentelemetry"]
---

## Prompt

In production, what should you record for each LLM call, and what should you leave out by default?

## Answer

Record one span per model call, nested in the request's trace:

- the operation and the model requested, plus the model the response says it used
- input and output tokens, including cache reads (these drive the cost)
- latency, and time to first token when streaming
- the finish or stop reason, such as `max_tokens` or `tool_use`, and any error type
- a conversation id to link the turns of one session, and your own prompt version

Add child spans for tool runs and retrieval, so a slow or wrong answer can be traced step by step.

Leave out message content by default. OpenTelemetry's GenAI conventions make the input and output messages opt-in, because they're likely to contain personal data. If you capture them for debugging, redact them, restrict access and set a short retention period.
