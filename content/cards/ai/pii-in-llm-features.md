---
title: "Sending customer data to an LLM"
module: ai
type: out-loud
source: "https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/"
tags: ["security", "privacy", "pii"]
stack: ["owasp"]
---

## Prompt

Your team wants to send support transcripts to a hosted LLM to draft replies. What privacy safeguards would you insist on?

## Model answer

- **Send less.** Only the fields the task needs. Mask or redact personal data such as emails, card numbers and addresses before the call wherever the task still works without them.
- **Enforce access in code, not in the prompt.** If the model can retrieve customer records, scope the query to the current customer. A system prompt saying "don't reveal other customers' data" can be bypassed by prompt injection, so treat it as an extra layer, not the control.
- **Know the provider's terms.** How long they keep data, whether it's used for training and whether you can opt out, and where it's processed. Then tell users plainly what happens to their data.
- **Mind your own logs.** Traces and error messages are a common leak, so don't store raw prompts by default and redact what you do keep.
- **Check the output too.** Filter replies for personal data that shouldn't be there before they're sent.
