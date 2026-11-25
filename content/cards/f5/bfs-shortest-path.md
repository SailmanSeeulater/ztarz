---
title: "Fewest hops: BFS or DFS"
module: f5
type: mcq
source: "https://en.wikipedia.org/wiki/Breadth-first_search"
tags: ["algorithms", "graphs", "bfs", "dfs"]
choices:
  - text: "DFS, stopping at the first path that reaches the target"
    why: "The first path DFS finds depends on the order it explores neighbours, and it can be far longer than the shortest."
  - text: "DFS over every path, keeping the shortest"
    why: "Correct answer, terrible cost: the number of paths can grow exponentially with the size of the graph."
  - text: "Dijkstra's algorithm"
    why: "It works, but it's built for weighted edges and needs a priority queue. With equal weights, BFS gives the same answer more simply."
  - text: "BFS from the start; the first time you reach the target is along a shortest path"
    correct: true
    why: "BFS explores in layers (distance 1, then 2, then 3) using a queue, in O(V + E). Mark nodes visited when you enqueue them, and keep a parent map to rebuild the path."
---

## Prompt

Find the fewest hops between two people in a friends graph, where every connection counts the same. Which approach?
