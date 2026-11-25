---
title: "Does this need an agent?"
module: ai
type: out-loud
source: "https://www.anthropic.com/engineering/building-effective-agents"
tags: ["llm", "agents", "architecture"]
---

## Prompt

A product manager wants an "AI agent" that reads each new invoice email and enters the totals in the accounting system. Would you build an agent?

## Model answer

Probably not. An agent is a model that decides its own steps and tool calls in a loop. That's worth it when you can't predict the steps in advance. Here the steps are known.

I'd build a workflow instead, where code fixes the path:

1. Extract the fields with one model call that returns structured output.
2. Validate them in code: totals add up, the supplier exists, the currency is known.
3. Write to the accounting system through its normal API.
4. Send anything that fails validation to a person.

Agents trade latency and cost for flexibility, their errors can compound over many steps, and they're harder to test. This one would also read untrusted email while holding write access to the accounts, which is a prompt-injection risk. Start with the simplest thing that works, and add autonomy only when evals show the simple version falls short.
