---
title: "When a hash map stops being O(1)"
module: f5
type: mcq
source: "https://en.wikipedia.org/wiki/Hash_table"
tags: ["data-structures", "big-o", "hashing"]
choices:
  - text: "Storing a large number of keys"
    why: "Size alone doesn't do it. The table resizes and rehashes as it fills, so the average stays O(1); the occasional resize is amortised across many inserts."
  - text: "Looking up a key that isn't there"
    why: "A miss costs the same as a hit on average: hash the key, check its bucket, done."
  - text: "Many keys landing in the same bucket, from a poor hash function or a table that's too full"
    correct: true
    why: "A lookup must then check every colliding entry in that bucket. In the worst case, all keys collide and lookup becomes O(n)."
  - text: "Using string keys instead of numbers"
    why: "Strings hash well. Hashing a key costs time proportional to the key's length, not to the number of entries."
---

## Prompt

Hash map lookups are "O(1) on average". What makes them degrade towards O(n)?
