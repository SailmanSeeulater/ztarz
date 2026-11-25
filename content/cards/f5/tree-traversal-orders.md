---
title: "Pre-order, in-order and post-order"
module: f5
type: what-prints
source: "https://en.wikipedia.org/wiki/Tree_traversal#Depth-first_search"
tags: ["data-structures", "trees", "traversal", "recursion"]
stack: ["javascript"]
---

## Prompt

The tree is a binary search tree. What prints?

```js
//        8
//      /   \
//     3     10
//    / \      \
//   1   6      14
const tree = { v: 8, l: { v: 3, l: { v: 1 }, r: { v: 6 } }, r: { v: 10, r: { v: 14 } } };

function walk(node, order, out = []) {
  if (!node) return out;
  if (order === "pre") out.push(node.v);
  walk(node.l, order, out);
  if (order === "in") out.push(node.v);
  walk(node.r, order, out);
  if (order === "post") out.push(node.v);
  return out;
}
console.log(walk(tree, "pre").join(" "));
console.log(walk(tree, "in").join(" "));
console.log(walk(tree, "post").join(" "));
```

## Answer

```text
8 3 1 6 10 14
1 3 6 8 10 14
1 6 3 14 10 8
```

## Explanation

The only difference is when the node itself is visited relative to its subtrees:

- **Pre-order** (node, left, right): parents before children. Useful for copying or serialising a tree.
- **In-order** (left, node, right): on a BST this gives the keys in ascending order.
- **Post-order** (left, right, node): children before parents. Useful for deleting a tree or summing sizes, where a node needs its children's results first.
