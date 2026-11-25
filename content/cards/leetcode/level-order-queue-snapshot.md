---
title: "Level order traversal merges levels"
module: leetcode
type: bug-hunt
source: "https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search"
tags: ["trees", "bfs", "queue"]
stack: ["leetcode", "javascript"]
choices:
  - text: "It should use a stack (`pop`) instead of `shift`"
    why: "A stack gives depth-first order, which mixes levels even more."
  - text: "Children should be pushed right first, then left"
    why: "That only changes the order within a level. The grouping is still wrong."
  - text: "`queue.shift()` is O(n), which corrupts the result"
    why: "It's slow on big arrays (a head index fixes that), but it doesn't change which values come out."
  - text: "`queue.length` changes while the loop runs; save `const size = queue.length` before the inner loop and loop to `size`"
    correct: true
    why: "The bound must be the number of nodes on the current level. Here children get pushed and pulled into the same level while others are shifted out, so levels blur."
---

## Prompt

LeetCode 102. Binary Tree Level Order Traversal: return the node values level by level. For a root 1 with children 2 and 3, where 2 has children 4 and 5, this returns `[[1,2,3],[4],[5]]` instead of `[[1],[2,3],[4,5]]`. What's wrong?

```js
function levelOrder(root) {
  if (!root) return [];
  const queue = [root];
  const levels = [];
  while (queue.length) {
    const level = [];
    for (let i = 0; i < queue.length; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    levels.push(level);
  }
  return levels;
}
```

## Explanation

BFS with a queue visits nodes in level order. To group them, take a snapshot of the queue length at the start of each level: exactly that many nodes belong to it, and anything pushed meanwhile belongs to the next level. O(n) time, O(width) space. The same snapshot trick gives right side view, level averages and zigzag order.
