---
number: 4
title: Median of Two Sorted Arrays
difficulty: Hard
source: https://leetcode.com/problems/median-of-two-sorted-arrays/
patterns: [Binary search on partitions, Merge two sorted arrays]
structures: [Array]
time: O(log(min(m, n)))
space: O(1)
stack: [leetcode, typescript]
---

## The problem
You get two arrays, each sorted ascending, and must return the median of all their values together, in logarithmic time. With `[2, 7]` and `[4]` the combined values are 2, 4, 7, so the median is 4. With `[1, 3]` and `[8, 10]` it is (3 + 8) / 2 = 5.5.

## Thinking it through
1. **Restate.** The median splits the combined sorted list into a left half and a right half of equal size (the left gets the extra one when the total is odd). For an odd total it is the largest value on the left; for an even total it is the average of the largest on the left and the smallest on the right.
2. **Simplest approach.** Concatenate and sort: O((m + n) log(m + n)). It ignores the fact that the inputs are already sorted.
3. **Better: merge.** Walk both arrays with two pointers like the merge step of merge sort, stopping once you reach the middle. That is O(m + n) time and O(1) space. A good answer to give first, but the problem asks for a log bound.
4. **What is wasted?** The merge looks at every value up to the middle, but all I need is *where* the halves split. That split is decided by one number: how many elements, `i`, the left half takes from the first array. The second array then supplies `j = half - i`, where `half = floor((m + n + 1) / 2)`.
5. **When is a split right?** Every value on the left must be no larger than every value on the right. Each array is already sorted internally, so only the two cross pairs need checking: `A[i-1] <= B[j]` and `B[j-1] <= A[i]`.
6. **Why binary search works.** If `A[i-1] > B[j]`, I took too many from A, so `i` must go down. If `B[j-1] > A[i]`, I took too few, so `i` must go up. The answer is monotonic in `i`, which is exactly the condition for binary search. This is *binary search on the partition*, not on values.
7. **Search the shorter array.** Run the search over `i` in `[0, m]` on the shorter array. That keeps `j` in range and gives O(log(min(m, n))).
8. **Boundaries.** When `i` is 0 or `m` (or `j` is 0 or `n`), one side has no element. Use `-Infinity` for a missing left value and `Infinity` for a missing right one, so the comparisons still hold.
9. **Read the answer.** Once the split is valid: `leftMax = max(A[i-1], B[j-1])`. Odd total: return `leftMax`. Even total: average it with `min(A[i], B[j])`.
10. **Edge cases.** One array empty (`[]` and `[6]` gives 6), all values equal, negatives.

## Solution
```ts
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1]; // search the shorter one
  const m = nums1.length;
  const n = nums2.length;
  const half = Math.floor((m + n + 1) / 2); // size of the left half

  let lo = 0;
  let hi = m;
  while (lo <= hi) {
    const i = Math.floor((lo + hi) / 2); // taken from nums1
    const j = half - i;                  // taken from nums2
    const aLeft = i > 0 ? nums1[i - 1] : -Infinity;
    const aRight = i < m ? nums1[i] : Infinity;
    const bLeft = j > 0 ? nums2[j - 1] : -Infinity;
    const bRight = j < n ? nums2[j] : Infinity;

    if (aLeft <= bRight && bLeft <= aRight) {
      const leftMax = Math.max(aLeft, bLeft);
      if ((m + n) % 2 === 1) return leftMax;
      return (leftMax + Math.min(aRight, bRight)) / 2;
    }
    if (aLeft > bRight) hi = i - 1; // took too many from nums1
    else lo = i + 1;                // took too few
  }
  throw new Error("inputs must be sorted");
}
```

## Complexity
- **Time O(log(min(m, n))):** each step halves the range of possible `i` in the shorter array.
- **Space O(1):** a handful of indices and boundary values.

## Pitfalls
- Binary searching the longer array, which lets `j` go negative.
- Forgetting the `±Infinity` sentinels and reading `undefined` at the edges.
- Using `(m + n) / 2` for the left size; the `+ 1` puts the extra element on the left for odd totals.
