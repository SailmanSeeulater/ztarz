---
title: "Building it now \"in case we need it\""
module: swe
type: mcq
source: "https://martinfowler.com/bliki/Yagni.html"
tags: ["yagni", "kiss", "simple-design"]
choices:
  - text: "YAGNI says never think about the future."
    why: "YAGNI is about not building capabilities before they're needed, not about refusing to think ahead."
  - text: "Build it behind a feature flag, then it costs nothing."
    why: "A flag hides it from users, but you've still paid to build it and everyone still carries the extra code."
  - text: "YAGNI also means don't refactor until a change forces you to."
    why: "The opposite. YAGNI doesn't apply to work that makes code easier to change, and that malleability is what makes waiting safe."
  - text: "You pay to build it now, real features wait, everyone carries the extra complexity, and it may be built wrong when the need arrives."
    correct: true
    why: "Build, delay, carry and repair costs. KISS is the sibling idea: choose the simplest design that meets today's need."
---

## Prompt

On a single-tenant MVP, a teammate wants to add a plugin system and multi-currency support "in case we need them". Which argument against it reflects YAGNI?
