---
title: "Graphs in everyday software"
module: math
type: out-loud
source: "https://en.wikipedia.org/wiki/Graph_theory"
tags: ["graph-theory", "graphs"]
---

## Prompt

Explain what a graph is, in the maths sense, and give three places it shows up in everyday software. About 60 seconds.

## Model answer

A graph is a set of **vertices** (nodes) joined by **edges**. Edges can be **directed** (A follows B) or undirected (A and B are friends), and **weighted** (a road's length) or not. Two other words matter: a **path** is a walk along edges, and a **cycle** is a path that returns to where it started.

It's the shape of anything that's about relationships:

- **Package dependencies** form a directed graph. Installing in the right order is a topological sort, which only works if there's no cycle.
- **Maps and routing**: junctions are vertices, roads are weighted edges, and directions are a shortest-path search.
- **Social networks and the web**: people or pages linked to each other. "People you may know" is a walk two edges out.

Once you spot that a problem is a graph, decades of known algorithms apply: BFS, DFS, shortest paths, cycle detection.
