---
title: "When a JSON schema reply can still be wrong"
module: ai
type: mcq
source: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs"
tags: ["llm", "structured-output", "json-schema"]
stack: ["anthropic"]
choices:
  - text: "Any normal `end_turn` reply, because constrained decoding is best effort"
    why: "With a schema set, a normal reply is constrained to valid JSON with the required fields and types, so `JSON.parse` won't fail on it."
  - text: "Replies sampled at a temperature above 0"
    why: "Sampling still happens inside the grammar. Temperature changes which valid output you get, not whether it is valid."
  - text: "A reply whose `stop_reason` is `refusal` or `max_tokens`"
    correct: true
    why: "A refusal message takes precedence over the schema, and a reply cut off at the limit is incomplete JSON. Check `stop_reason` before parsing, and still validate business rules the schema feature can't enforce, such as numeric `minimum` or string length."
  - text: "Any reply longer than 1,000 tokens"
    why: "Length alone doesn't break the guarantee. Hitting your `max_tokens` limit does, which is a different thing."
---

## Prompt

You pass a JSON schema in `output_config.format`, so Claude's reply is constrained to it. Which reply can still fail to match your schema?
