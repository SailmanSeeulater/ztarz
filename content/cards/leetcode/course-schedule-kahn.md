---
title: "Course Schedule: spotting the cycle"
module: leetcode
type: mcq
source: "https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm"
tags: ["graphs", "topological-sort", "cycle-detection"]
stack: ["leetcode"]
choices:
  - text: "If at least one course has in-degree 0 at the start, every course can be finished"
    why: "Some courses can start, but a cycle elsewhere can still block the rest."
  - text: "BFS from course 0 and check that every course is reached"
    why: "Reachability isn't the question: the graph can be disconnected, and reaching a node says nothing about cycles."
  - text: "If the queue ever holds more than one course, there's a conflict"
    why: "Several ready courses just means several valid orders. It's not an error."
  - text: "Count the courses you take off the queue; if it's fewer than `numCourses`, a cycle stopped the rest"
    correct: true
    why: "Courses on a cycle never reach in-degree 0, so they never enter the queue. O(V + E) time."
---

## Prompt

LeetCode 207. Course Schedule: given a number of courses and prerequisite pairs, decide whether every course can be completed. You use Kahn's algorithm: compute in-degrees, queue the courses with none, and decrement neighbours as you take courses off the queue. How do you get the answer?
