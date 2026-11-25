---
title: "Topological sort and cycle detection"
module: f5
type: concept
source: "https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm"
tags: ["algorithms", "graphs", "topological-sort", "dag"]
---

## Prompt

You have services with "must start before" dependencies. How do you find a valid start order, and how does the same algorithm tell you the dependencies contain a cycle?

## Answer

Use a topological sort. Kahn's algorithm:

1. Count each node's incoming edges (its in-degree).
2. Put every node with in-degree 0 in a queue: nothing has to come before it.
3. Repeatedly take a node from the queue and append it to the order. For each node it points to, subtract one from that node's in-degree; when it hits 0, enqueue it.

```js
const queue = nodes.filter((n) => indegree.get(n) === 0);
const order = [];
while (queue.length > 0) {
  const n = queue.shift();
  order.push(n);
  for (const m of next.get(n)) {
    indegree.set(m, indegree.get(m) - 1);
    if (indegree.get(m) === 0) queue.push(m);
  }
}
if (order.length < nodes.length) throw new Error("dependency cycle");
```

It runs in O(V + E). If the queue empties before every node is placed, the leftover nodes are all waiting on each other: a cycle. A valid order exists only when the graph is a DAG (directed and acyclic). Several orders can be valid; which one you get depends on how you pick from the queue.
