---
title: "Stack vs queue: undo and BFS"
module: f5
type: mcq
source: "https://en.wikipedia.org/wiki/Breadth-first_search"
tags: ["data-structures", "stack", "queue", "graphs"]
choices:
  - text: "Undo: stack. BFS: queue."
    correct: true
    why: "Undo reverses the most recent action first: last in, first out. BFS must finish every node at distance d before any at d + 1, so the first node discovered is the first explored: first in, first out."
  - text: "Undo: queue. BFS: stack."
    why: "Swapped. A queue would undo your oldest action first, and a stack frontier turns BFS into depth-first search."
  - text: "Undo: stack. BFS: stack."
    why: "Replacing BFS's queue with a stack gives you DFS, which no longer explores level by level."
  - text: "Undo: stack. BFS: priority queue."
    why: "A priority queue is for Dijkstra on weighted graphs. With equal edge weights, a plain queue already hands out nodes in distance order."
---

## Prompt

Which structure fits (a) an editor's undo history, and (b) the frontier of nodes waiting to be visited in a breadth-first search?
