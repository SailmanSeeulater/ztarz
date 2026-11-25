---
title: "Subsets returns empty arrays"
module: leetcode
type: what-prints
source: "https://en.wikipedia.org/wiki/Power_set"
tags: ["backtracking", "references"]
stack: ["leetcode", "javascript"]
---

## Prompt

LeetCode 78. Subsets: return every subset of a list of distinct numbers. What does this backtracking version print?

```js
function subsets(nums) {
  const out = [];
  const path = [];
  function dfs(i) {
    if (i === nums.length) {
      out.push(path);
      return;
    }
    path.push(nums[i]);   // take nums[i]
    dfs(i + 1);
    path.pop();           // skip nums[i]
    dfs(i + 1);
  }
  dfs(0);
  return out;
}
console.log(subsets([1, 2]));
```

## Answer

`[ [], [], [], [] ]`

## Explanation

The structure is right (four results for two numbers), but `out` holds four references to the same `path` array, which is empty once backtracking has undone every push. Store a snapshot: `out.push([...path])`. There are 2ⁿ subsets and each copy costs up to n, so O(n · 2ⁿ). The same copy rule applies to permutations and combination sums.
