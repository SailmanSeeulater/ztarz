---
title: "Choosing a key for a list"
module: frontend
type: mcq
source: "https://react.dev/learn/rendering-lists"
tags: ["react", "lists", "keys"]
stack: ["react"]
choices:
  - text: "`Math.random()`"
    why: "A new key every render remounts every item, losing state and focus."
  - text: "The array index"
    why: "Index keys break on reorder, insert and delete: state sticks to the wrong row."
  - text: "The patient's database id"
    correct: true
    why: "Keys must be stable and unique among siblings. A database id is both."
  - text: "The patient's name"
    why: "Names aren't unique, and they can change."
---

## Prompt

Best `key` for a list of patients?
