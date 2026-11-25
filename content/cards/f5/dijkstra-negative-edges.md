---
title: "Dijkstra and negative edges"
module: f5
type: mcq
source: "https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm"
tags: ["algorithms", "graphs", "shortest-path", "dijkstra"]
choices:
  - text: "It returns 1 for A. Once Dijkstra takes a node off the priority queue it treats that distance as final, and a negative edge found later can undercut it"
    correct: true
    why: "A is the closest unvisited node (1), so it's settled first. The path S → B → A costs 4 - 5 = -1, but A is never revisited. The proof that settled distances are final relies on edges never making a path shorter."
  - text: "It returns -1 for A, just more slowly"
    why: "Plain Dijkstra never reopens a settled node, so it doesn't find the cheaper path at all. It's wrong, not slow."
  - text: "It throws an error when it meets a negative weight"
    why: "Nothing in the algorithm checks the sign. It silently gives a wrong answer, which is worse."
  - text: "It's correct as long as there's no negative cycle"
    why: "That's the condition for Bellman-Ford, which handles negative edges in O(V·E). Dijkstra needs every edge to be non-negative."
---

## Prompt

Edges: S → A (1), S → B (4), B → A (-5). What does Dijkstra's algorithm report as the shortest distance from S to A?
