---
title: "Group Anagrams: pick the bucket key"
module: leetcode
type: mcq
source: "https://leetcode.com/problems/group-anagrams/"
tags: ["arrays-hashing", "hash-map", "strings"]
stack: ["leetcode"]
choices:
  - text: "Compare every pair of words with a sorted-letters check and union the matches"
    why: "It gives the right groups, but n² pairs is far too slow once n reaches tens of thousands."
  - text: "A hash map keyed by each word's letters sorted, so `eat`, `tea` and `ate` all map to `aet`. O(n · k log k)"
    correct: true
    why: "Anagrams share the same sorted form, so one pass fills the buckets. A 26-slot letter-count key (for lowercase input) drops the sort and gives O(n · k)."
  - text: "A hash map keyed by the sum of the character codes"
    why: "Different letters can add up to the same sum: `ad` and `bc` collide but aren't anagrams."
  - text: "Sort the whole list alphabetically, then group neighbours"
    why: "Alphabetical order puts `ate`, `eat` and `tea` far apart. Sorting the words doesn't sort their letters."
---

## Prompt

LeetCode 49. Group Anagrams: given a list of lowercase words, return them in groups, where each group holds words made of exactly the same letters. For n words of length up to k, which approach and cost?
