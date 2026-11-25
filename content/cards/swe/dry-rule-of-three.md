---
title: "Extract the duplicate now, or wait?"
module: swe
type: out-loud
source: "https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming)"
tags: ["dry", "abstraction", "refactoring"]
---

## Prompt

Two handlers contain nearly the same ten lines. Do you extract a shared helper straight away?

## Model answer

Not automatically. Two similar pieces of code may look alike today and change for different reasons tomorrow. If I extract too early, the helper picks up flags and special cases for each caller, and that wrong abstraction costs more than the duplication did.

So I use the rule of three: tolerate two copies, and refactor when a third appears, because by then the shared shape is clear. The exception is a real business rule, such as a tax rate or a permission check. If changing one copy and forgetting the other would be a bug, I centralise it now.
