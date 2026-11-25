---
title: "Recursive DFS that overflows the stack"
module: f5
type: bug-hunt
source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Too_much_recursion"
tags: ["algorithms", "graphs", "dfs", "recursion", "call-stack"]
stack: ["javascript"]
choices:
  - text: "The graph has a cycle, so `dfs` recurses forever"
    why: "The `seen` check stops cycles: a node already visited returns at once. And a straight chain has no cycle at all."
  - text: "A `Set` can't hold 200,000 entries"
    why: "A `Set` holds millions of values without trouble. The error is about the call stack, not the heap."
  - text: "Each nested call takes a stack frame, and a 200,000-node chain needs 200,000 frames at once; the engine's stack runs out long before that"
    correct: true
    why: "Recursion depth equals the longest path DFS follows. The fix is an explicit stack (an array you push and pop), which lives on the heap and can grow as large as memory allows."
  - text: "`seen.add(node)` should come after the loop, not before it"
    why: "That makes it worse: neighbours could recurse back into a node not yet marked, so cycles would loop forever. Marking on entry is right."
---

## Prompt

This works on small graphs but throws `RangeError: Maximum call stack size exceeded` on a chain `0 → 1 → 2 → … → 199999`. Why?

```js
function countReachable(graph, start) {
  const seen = new Set();
  function dfs(node) {
    if (seen.has(node)) return;
    seen.add(node);
    for (const next of graph.get(node) ?? []) dfs(next);
  }
  dfs(start);
  return seen.size;
}
```

## Explanation

Every function call pushes a frame (arguments, locals, where to return) onto the call stack, and it stays there until the call returns. The call stack has a size limit, so deep recursion overflows it even when the logic is correct. The same thing happens with no base case at all, only faster.

Iterative DFS keeps the frontier in an array instead:

```js
function countReachable(graph, start) {
  const seen = new Set([start]);
  const stack = [start];
  while (stack.length > 0) {
    const node = stack.pop();
    for (const next of graph.get(node) ?? []) {
      if (!seen.has(next)) {
        seen.add(next);
        stack.push(next);
      }
    }
  }
  return seen.size;
}
```

Same O(V + E) time, and the stack depth no longer depends on the input. Recursion is fine when depth is bounded, as in a balanced tree (O(log n) deep); be wary when it follows a path through user-sized data.
