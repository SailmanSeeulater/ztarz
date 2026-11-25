---
title: "Number of Islands in 60 seconds"
module: leetcode
type: out-loud
source: "https://en.wikipedia.org/wiki/Flood_fill"
tags: ["graphs", "dfs", "bfs", "grid"]
stack: ["leetcode"]
---

## Prompt

LeetCode 200. Number of Islands: a grid holds land and water cells; count the groups of land connected up, down, left or right. Explain your approach in a minute.

## Model answer

It's counting connected components, with the grid as an implicit graph: each cell is a node and its four neighbours are its edges.

I scan every cell. When I find land I haven't visited, that's a new island, so I add one and flood fill from it with DFS or BFS, marking every connected land cell as visited. Either overwrite it with water, if I'm allowed to change the input (I'd ask), or keep a visited set.

Every cell is visited a constant number of times, so it's O(rows × cols) time. Recursive DFS can go as deep as the whole grid on one big island, which can overflow the call stack, so on large inputs I'd use an explicit stack or a queue. With BFS, mark cells when you enqueue them, not when you dequeue them, or the same cell gets queued several times.

Union-find also works and suits a follow-up where land is added one cell at a time.
