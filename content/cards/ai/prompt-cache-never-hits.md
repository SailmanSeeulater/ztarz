---
title: "The prompt cache that never hits"
module: ai
type: bug-hunt
source: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching"
tags: ["llm", "prompt-caching", "cost"]
stack: ["anthropic"]
choices:
  - text: "The handbook is under the minimum cacheable length"
    why: "Tens of thousands of tokens is well above any minimum. And a prompt that's too short shows 0 for both cache fields, not a fresh cache write every time."
  - text: "The timestamp block sits before the breakpoint and changes on every request, so the cached prefix is never byte-identical"
    correct: true
    why: "Move anything that changes per request after the cached content, for example into the user message, so the handbook prefix stays the same."
  - text: "Only `messages` can be cached, not `system`"
    why: "The cached prefix runs in order through `tools`, then `system`, then `messages`. System blocks are the usual place for a breakpoint."
  - text: "The cache expires after five minutes and these calls are too far apart"
    why: "Calls arrive several times a minute, well inside the default lifetime, and each hit refreshes it."
---

## Prompt

Calls arrive several times a minute. Every response shows `cache_read_input_tokens: 0` and a large `cache_creation_input_tokens`. Why?

```ts
const system = [
  { type: "text", text: `Current time: ${new Date().toISOString()}` },
  { type: "text", text: HANDBOOK, cache_control: { type: "ephemeral" } }, // ~20k tokens
];
```

## Explanation

A cache hit needs the prompt identical, byte for byte, up to and including the block marked with `cache_control`. Here every request writes a new cache entry, and cache writes cost more than plain input (1.25x for the five-minute cache), so this costs more than no caching at all. Fixed, the handbook is read from cache at a fraction of the input price. Put stable content first and anything that varies last.
