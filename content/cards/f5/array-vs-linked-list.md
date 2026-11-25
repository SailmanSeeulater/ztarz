---
title: "Array vs linked list"
module: f5
type: mcq
source: "https://en.wikipedia.org/wiki/Linked_list#Linked_lists_vs._dynamic_arrays"
tags: ["data-structures", "big-o", "arrays"]
choices:
  - text: "Linked list, because inserts are O(1)"
    why: "Only at a node you already hold. Reaching `items[5000]` means walking 5,000 nodes: O(n)."
  - text: "Array: O(1) indexing and amortised O(1) append, in contiguous memory"
    correct: true
    why: "Index access is a single address calculation, and contiguous storage is also cache-friendly. Linked lists win at O(1) insert or remove at the front, or at a node you already hold."
  - text: "Linked list, because it uses less memory"
    why: "Each node stores at least one pointer on top of the value, so it uses more."
  - text: "Either; both index in O(log n)"
    why: "An array indexes in O(1) and a linked list in O(n). O(log n) lookups belong to balanced trees and binary search."
---

## Prompt

You need fast access by position (`items[5000]`) and you mostly append to the end. Array or linked list, and why?
