---
title: "Single responsibility means one reason to change"
module: swe
type: mcq
source: "https://en.wikipedia.org/wiki/Single-responsibility_principle"
tags: ["solid", "srp", "design-principles"]
choices:
  - text: "It breaks SRP because the class has more than one public method."
    why: "SRP isn't about method count. A responsibility is a reason to change, tied to who asks for the change."
  - text: "It's fine while the file stays under a few hundred lines."
    why: "Size isn't the test. A short class can still mix two concerns that change for different people."
  - text: "Merge more reporting code into it so all report logic lives in one place."
    why: "That piles on more reasons to change and makes every edit riskier."
  - text: "Split it: totals change when finance changes the rules, layout changes when design does. Two actors, two modules."
    correct: true
    why: "Separated, a layout tweak can't break the totals, and each part can be tested and changed on its own."
---

## Prompt

An `InvoiceReport` class calculates totals and tax (rules owned by finance) and also lays out the PDF (owned by the design team). What does the single-responsibility principle say?
