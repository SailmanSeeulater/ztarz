---
title: "Adjacency list or adjacency matrix"
module: f5
type: mcq
source: "https://en.wikipedia.org/wiki/Adjacency_list#Trade-offs"
tags: ["data-structures", "graphs", "big-o"]
choices:
  - text: "An adjacency matrix, because checking whether two users are friends is O(1)"
    why: "The edge test is O(1), but the matrix needs V² cells: 10¹² for a million users, almost all of them empty."
  - text: "An adjacency matrix, because listing a user's friends is faster"
    why: "It's slower: you must scan a whole row of a million cells to find about 200 friends. A list gives them in time proportional to the degree."
  - text: "An adjacency list: O(V + E) memory and neighbours in O(degree)"
    correct: true
    why: "About 200 million entries instead of 10¹² cells, and graph walks like BFS iterate neighbours, which a list does directly. A matrix only pays off when the graph is dense."
  - text: "A single array of every `[userA, userB]` pair"
    why: "That's compact, but finding one user's friends means scanning all E edges. It's a fine storage or input format, not something to traverse."
---

## Prompt

A social graph has 1 million users with about 200 friends each, and you'll mostly run BFS over it ("friends of friends"). How should you store it in memory?
