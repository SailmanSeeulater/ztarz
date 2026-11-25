---
title: "How do you review an AI-written pull request?"
module: interview
type: out-loud
source: "https://docs.github.com/en/copilot/tutorials/review-ai-generated-code"
tags: ["code-review", "ai", "collaboration"]
---

## Prompt

How do you review a pull request that an AI assistant wrote?

## Model answer

Like any pull request, with less trust in the parts that look plausible.

**Intent first.** Does it solve the problem asked, and only that? AI changes tend to be large and drift into refactors nobody wanted, so I ask for them to be split.

**Machines next.** CI must be green: types, lint, tests, build. Then I read the tests themselves. Were failing tests deleted, skipped or loosened? Do new tests check behaviour, or just mirror the code?

**Then the AI-specific failures:**

- APIs or options that don't exist, or belong to another version. I check them against the docs. In ztarz, Next.js 16 differs from what most models learned.
- New dependencies: do they exist, are they maintained, are they needed? Hallucinated package names are an attack vector.
- Ignored constraints: an auth check missing from one procedure, a secret in code, errors swallowed.

**Finally I run it:** check out the branch and try the change, edge cases included.

I approve only when I could explain every line myself. Whoever opened the pull request owns it, whether they typed it or not.
