---
title: "Why a BST built from sorted keys is slow"
module: f5
type: what-prints
source: "https://en.wikipedia.org/wiki/Binary_search_tree"
tags: ["data-structures", "trees", "bst", "big-o"]
stack: ["javascript"]
---

## Prompt

Same seven keys, two insertion orders. What prints?

```js
class Node {
  constructor(key) { this.key = key; this.left = null; this.right = null; }
}
function insert(root, key) {
  if (!root) return new Node(key);
  if (key < root.key) root.left = insert(root.left, key);
  else root.right = insert(root.right, key);
  return root;
}
const height = (n) => (n ? 1 + Math.max(height(n.left), height(n.right)) : 0);

let a = null;
for (const k of [4, 2, 6, 1, 3, 5, 7]) a = insert(a, k);
let b = null;
for (const k of [1, 2, 3, 4, 5, 6, 7]) b = insert(b, k);
console.log(height(a), height(b));
```

## Answer

```text
3 7
```

## Explanation

Search, insert and delete in a binary search tree cost O(height). Inserting 4 first gives a balanced tree of height 3 (about log₂ n). Inserting in ascending order sends every key to the right child, so the tree is a linked list with height n, and every operation becomes O(n).

Self-balancing trees (AVL, red-black) fix this by rotating nodes on insert and delete so the height stays O(log n) whatever the input order.
