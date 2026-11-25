---
title: "The birthday problem and hash collisions"
module: math
type: mcq
source: "https://en.wikipedia.org/wiki/Birthday_attack"
tags: ["probability", "hashing", "birthday-problem"]
choices:
  - text: "About 2.1 billion, half of 2³²"
    why: "That's the intuition the birthday problem breaks. Every new item can clash with every earlier one, so pairs grow with n² and collisions arrive far sooner."
  - text: "About 77,000"
    correct: true
    why: "A collision becomes 50% likely around √(2³²) ≈ 65,536 items; the precise estimate is about 1.18 × 2¹⁶ ≈ 77,000. Same reason 23 people give better than even odds of a shared birthday."
  - text: "About 4.3 billion, the full 2³²"
    why: "That's when a collision becomes certain (pigeonhole). 50% arrives much earlier."
  - text: "Never, as long as the hash function is good"
    why: "A good hash spreads outputs evenly, which is exactly what the birthday maths assumes. You can't fit more items than outputs without clashes."
---

## Prompt

You give each upload a random 32-bit ID instead of a database sequence. Roughly how many uploads before there's a 50% chance that two share an ID?
