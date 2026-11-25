---
title: "ArrayList vs LinkedList"
module: java
type: mcq
source: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayList.html"
tags: ["java", "collections", "performance"]
stack: ["java"]
choices:
  - text: "`LinkedList`, because adding to the end of an `ArrayList` copies the whole array every time"
    why: "`ArrayList` grows its backing array in steps, so `add` at the end is amortised constant time."
  - text: "`LinkedList`, because it uses less memory per element"
    why: "Each `LinkedList` node stores the element plus two links, so it uses more memory, and the nodes are scattered."
  - text: "`ArrayList`: `get(i)` is constant time, appends are amortised constant time, and its constant factors are lower"
    correct: true
    why: "It's a resizable array, so indexing is direct. A `LinkedList` must walk from one end to reach index `i`."
  - text: "They perform the same; the choice is purely stylistic"
    why: "Indexed access is O(1) for one and O(n) for the other."
---

## Prompt

You need a list you'll mostly append to and read by index. Which implementation, and why?
