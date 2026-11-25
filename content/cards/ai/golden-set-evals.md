---
title: "Proving a prompt change didn't break anything"
module: ai
type: out-loud
source: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests"
tags: ["llm", "evals", "testing"]
---

## Prompt

You've changed the prompt behind an LLM feature. How do you know you didn't break it?

## Model answer

I'd run it against an eval set, sometimes called a golden set, before shipping.

- **What's in it:** realistic inputs that look like real traffic, plus edge cases: empty or irrelevant input, very long input, and ambiguous cases where even people might disagree. Each has an expected answer or clear grading criteria.
- **How it's graded:** automatically wherever possible. Exact match for labels, code checks for format and required fields, and an LLM grader with a written rubric for open-ended text, ideally a different model from the one being tested. Humans spot-check a sample.
- **Size:** many questions with slightly noisier automatic grading beat a handful graded carefully by hand.
- **How it's used:** run it on every prompt or model change, compare the score with the last baseline, and look at the cases that flipped. When production turns up a new failure, add it to the set so it can't come back.

It's a regression test suite for behaviour you can't unit-test line by line.
