---
title: "Permutations vs combinations"
module: math
type: mcq
source: "https://en.wikipedia.org/wiki/Combination"
tags: ["combinatorics", "counting"]
choices:
  - text: "1,000 rotas and 120 panels"
    why: "10 × 10 × 10 allows the same person in every slot. Once someone is primary they can't also be secondary, so it's 10 × 9 × 8."
  - text: "120 rotas and 720 panels"
    why: "Swapped. Ordering creates more arrangements, never fewer, so the rota count must be the bigger one."
  - text: "30 rotas and 10 panels"
    why: "That multiplies or adds the wrong things. Each slot's choices multiply, and there are fewer choices left for each later slot."
  - text: "720 rotas and 120 panels"
    correct: true
    why: "Order matters for the rota: 10 × 9 × 8 = 720 permutations. For a panel the 3! = 6 orderings of the same three people count once: 720 / 6 = 120, which is C(10, 3)."
---

## Prompt

A team has 10 developers. How many ways can you fill an on-call rota of primary, secondary and tertiary (order matters), and how many ways can you pick a 3-person review panel (order doesn't)?
