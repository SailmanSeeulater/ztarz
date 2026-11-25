---
title: "A prompt that gets mergeable code"
module: f11
type: mcq
source: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
tags: ["llm", "prompting", "ai"]
stack: ["claude"]
choices:
  - text: "\"Add rate limiting to the login route.\""
    why: "Too vague. It has to guess the limit, where state is stored and what a blocked user sees."
  - text: "\"You are a world-class senior engineer. Write perfect, production-ready rate limiting.\""
    why: "A role and praise add no facts. It still doesn't know your limits, files or conventions."
  - text: "Paste the whole repository, then \"add rate limiting\""
    why: "Volume isn't relevant context. The requirements are still missing, and very long contexts lower recall."
  - text: "\"Limit POST /login in `src/routes/auth.ts` to 5 attempts per IP per 15 minutes using our Redis client in `src/lib/redis.ts`; return 429. Follow the pattern in `src/middleware/auth.ts`. Brute-force attempts are the reason. Add tests for the 5th and 6th attempt and run them.\""
    correct: true
    why: "It gives context (files, why), constraints (limits, response), an example to copy, and a way to verify the result."
---

## Prompt

Which prompt is most likely to get code from an AI assistant that you can merge?
