---
title: "The bot that invented a refund policy"
module: f11
type: bug-hunt
source: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"
tags: ["llm", "hallucination", "grounding"]
stack: ["claude"]
choices:
  - text: "Set temperature to 0"
    why: "Lower temperature favours the most probable wording. That makes the guess more repeatable, not more correct."
  - text: "Switch to a larger model"
    why: "A larger model still has never seen your policy. It would guess more fluently."
  - text: "Add \"Do not hallucinate\" to the prompt"
    why: "An instruction can't supply facts that aren't there. Without the policy in context, the model still has nothing to answer from."
  - text: "Put the policy text in the prompt, tell it to answer only from that text and quote the line it used, and allow \"I don't know\""
    correct: true
    why: "Grounding gives it the facts, quoting makes each claim checkable, and permission to admit uncertainty removes the pressure to guess."
---

## Prompt

The support bot told a customer refunds are accepted within 60 days. The real policy is 30. What's the fix?

```text
You are a helpful support agent for Acme.
Answer the customer's question.

Question: {{question}}
```

## Explanation

A language model generates the most plausible continuation of its context; it doesn't look facts up. Asked about a policy it has never seen, a confident, wrong answer reads just like a right one. Ground it in the source, ask for quotes or citations, have it drop any claim it can't support, and still check critical answers yourself: these steps reduce made-up answers, they don't eliminate them.
