---
title: "One change, seven files"
module: swe
type: mcq
source: "https://refactoring.guru/smells/shotgun-surgery"
tags: ["code-smells", "refactoring", "cohesion"]
choices:
  - text: "Divergent change"
    why: "That's the mirror image: one class edited for many unrelated reasons."
  - text: "Long method"
    why: "That smell is one function doing too much. Here the logic is spread thin, not piled up."
  - text: "Shotgun surgery"
    correct: true
    why: "One responsibility is scattered across many places. Gather it with Move Method and Move Field, for example into a `Tier` definition everything reads from."
  - text: "Feature envy"
    why: "Feature envy is a method that uses another object's data more than its own. It can contribute, but it doesn't describe a change rippling across files."
---

## Prompt

Adding a subscription tier means editing `pricing.ts`, the checkout form, the invoice template, the admin filter and three `switch` statements in different files. Which code smell is this?
