---
title: "Keeping an LLM judge honest"
module: ai
type: mcq
source: "https://arxiv.org/abs/2306.05685"
tags: ["llm", "evals", "llm-as-judge"]
choices:
  - text: "Have the model that wrote answer A do the judging, since it knows the domain"
    why: "That invites self-enhancement bias: judges tend to favour answers like their own. Use a different model where you can."
  - text: "Run each pair twice with A and B swapped, and count only verdicts that agree"
    correct: true
    why: "Judges show position bias: they favour whichever answer comes first, or second. Swapping the order exposes it. Also check the judge's verdicts against a sample of human labels before you trust its numbers."
  - text: "When the judge is unsure, prefer the longer answer, since it's usually more complete"
    why: "Judges already lean towards longer answers (verbosity bias). This rule builds the bias in."
  - text: "Ask for a score from 0 to 100 instead of a choice, for finer detail"
    why: "A wider scale doesn't remove the order effect, and a finer number isn't more accurate."
---

## Prompt

You use an LLM to pick the better of two answers, A and B, for 500 eval questions. Which practice best reduces a known judge bias?
