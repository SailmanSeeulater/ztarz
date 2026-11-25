---
title: "Lowest common ancestor in a BST"
module: leetcode
type: mcq
source: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"
tags: ["trees", "bst"]
stack: ["leetcode"]
choices:
  - text: "The general binary-tree recursion: search both subtrees and return the node where p and q come from different sides"
    why: "Correct for any binary tree, but it ignores the ordering and can visit every node: O(n)."
  - text: "Build a parent map, walk up from p marking ancestors, then walk up from q to the first marked node"
    why: "Also correct, but O(n) time and O(n) memory to build the map first."
  - text: "Walk down from the root: if both values are smaller go left, if both are larger go right, otherwise stop here"
    correct: true
    why: "The first node whose value lies between p and q (inclusive) is where their paths split, so it's the answer. O(h) time, O(1) space."
  - text: "Do an in-order traversal and take the node that sits between p and q"
    why: "In-order gives sorted values, and several nodes can sit between p and q. The list alone doesn't tell you which one is the ancestor."
---

## Prompt

LeetCode 235. Lowest Common Ancestor of a Binary Search Tree: given a BST and two of its nodes p and q, return the deepest node that has both as descendants (a node counts as its own descendant). What's the best approach?
