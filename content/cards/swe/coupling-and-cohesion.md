---
title: "Coupling and cohesion"
module: swe
type: concept
source: "https://en.wikipedia.org/wiki/Cohesion_(computer_science)"
tags: ["coupling", "cohesion", "modularity"]
---

## Prompt

What are coupling and cohesion, and which way do you want each?

## Answer

**Cohesion** is how closely the things inside one module belong together. **Coupling** is how much one module depends on the internals of others. Aim for high cohesion and loose coupling; they tend to come together.

A cohesive `billing` module holds pricing, invoices and tax, so a billing change touches one place. Tight coupling shows up when an edit to one module forces edits in others, for example when the orders code reads billing's tables directly. The pay-off is smaller, easier changes and modules you can reuse or test alone.
