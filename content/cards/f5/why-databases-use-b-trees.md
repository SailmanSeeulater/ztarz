---
title: "Why database indexes use B-trees"
module: f5
type: mcq
source: "https://en.wikipedia.org/wiki/B-tree"
tags: ["data-structures", "trees", "b-tree", "databases"]
choices:
  - text: "B-trees give O(1) lookups, like a hash table"
    why: "B-tree lookups are O(log n). The win is a much smaller constant: the log's base is the number of children per node, not 2."
  - text: "Each node holds many keys and children, so the tree is only a few levels deep and a lookup reads only a few disk pages"
    correct: true
    why: "Storage reads whole blocks and each read is slow, so the cost that matters is how many blocks you touch. A node sized to a block, with many children, keeps even a large index within a few levels."
  - text: "Binary search trees can't answer range queries like `BETWEEN 10 AND 20`"
    why: "They can: an in-order walk visits keys in sorted order. B-trees also keep keys sorted, which is why they handle ranges well too."
  - text: "B-trees never need rebalancing"
    why: "They do, by splitting full nodes and merging sparse ones. That's how they stay balanced, with every leaf at the same depth."
---

## Prompt

In memory, a balanced binary tree (AVL, red-black) gives O(log n) lookups. Why do databases and file systems use B-trees for on-disk indexes instead?
