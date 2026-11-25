---
title: "What temperature changes"
module: f11
type: mcq
source: "https://platform.claude.com/docs/en/about-claude/glossary#temperature"
tags: ["llm", "sampling"]
choices:
  - text: "It makes the answers more factually accurate"
    why: "Low temperature picks the most likely wording. Likely isn't the same as true."
  - text: "It lowers the cost of each request"
    why: "Pricing is per token. Temperature changes which tokens are chosen, not how they're billed."
  - text: "The model sticks to the most probable tokens, so output is more conservative and consistent, though still not guaranteed identical"
    correct: true
    why: "Higher temperature lets it pick less likely tokens, giving more varied, creative output. Even at 0, identical inputs can give different outputs."
  - text: "Output becomes fully deterministic, the same every time"
    why: "Not quite: even at temperature 0, LLM APIs aren't fully deterministic. Don't build tests that expect byte-identical output."
---

## Prompt

You set `temperature: 0` on an endpoint that extracts fields from invoices. What did that change?
