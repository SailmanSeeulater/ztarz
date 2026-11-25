---
title: "Union-find with path compression"
module: f5
type: concept
source: "https://cp-algorithms.com/data_structures/disjoint_set_union.html"
tags: ["data-structures", "union-find", "graphs"]
---

## Prompt

What problem does union-find (disjoint set union) solve, how does it work, and what do path compression and union by size buy you?

## Answer

It tracks which items are in the same group while groups keep merging: "are these two servers on the same network?", "does adding this edge create a cycle?" (Kruskal's minimum spanning tree).

Each group is a tree stored in a `parent` array; the root is the group's representative. `find(v)` follows parents to the root. `union(a, b)` links one root under the other.

```js
function find(v) {
  if (parent[v] !== v) parent[v] = find(parent[v]); // path compression
  return parent[v];
}
function union(a, b) {
  a = find(a);
  b = find(b);
  if (a === b) return false; // already connected
  if (size[a] < size[b]) [a, b] = [b, a]; // union by size
  parent[b] = a;
  size[a] += size[b];
  return true;
}
```

Without the two tricks, trees can become long chains and `find` costs O(n). **Path compression** points every node on the walk straight at the root, so later finds are short. **Union by size** hangs the smaller tree under the larger, so trees stay shallow. Together they give amortised O(α(n)) per operation, where α (inverse Ackermann) is at most 4 for any realistic n: effectively constant.
