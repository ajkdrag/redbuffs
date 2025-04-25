---
{"publish":true,"tags":["type/problem"],"platform":"Leetcode","link":"https://leetcode.com/problems/next-permutation/description/","PassFrontmatter":true,"created":"2025-01-30T12:54:40.965+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/two pointers technique\|two pointers technique]]
> - [[2 Zettels/greedy algorithm\|greedy algorithm]]
> - [[combinatorics\|combinatorics]]

## Idea

The next permutation algorithm finds the lexicographically smallest permutation _larger_ than a given sequence. If the sequence is already the largest, it returns the smallest (sorted ascending).

**Intuition:** To find the _next_ permutation, we want to change the sequence as little as possible, starting from the right.

### Algorithm

1. **Find the pivot:** Scan from right to left, finding the first element `arr[i]` that is _smaller_ than the element to its right (`arr[i+1]`). This `arr[i]` is the "pivot". If no such element exists, the sequence is the largest, so reverse it and return.
2. **Find the swap:** Scan from right to left _again_, finding the smallest element `arr[j]` that is _larger_ than the pivot `arr[i]`.
3. **Swap:** Swap `arr[i]` and `arr[j]`.
4. **Reverse the suffix:** Reverse the portion of the array _after_ the pivot (`arr[i+1]` to the end).

**Example:** `[4, 2, 3, 1]`

1. Pivot: `2` (because `2 < 3`)
2. Swap: `3` (smallest element to the right of `2` that's larger than `2`)
3. After swap: `[4, 3, 2, 1]`
4. Reverse suffix: `[4, 3, 1, 2]`

### Proof of Correctness (Intuitive)

- **Minimality:** By starting from the right, we're changing the least significant digits first, ensuring the smallest possible change for the next permutation.
- **Correct Swap:** Swapping with the _smallest_ larger element (`arr[j]`) in the suffix ensures we get the _next_ larger permutation. Because the suffix is sorted in descending order (how we found the pivot), searching right-to-left guarantees finding the smallest larger element.
- **Reversed Suffix:** After the swap, the suffix (from `i+1`) stays in descending order. Reversing it puts it in ascending order, creating the smallest possible suffix for the next permutation. This ensures we're getting the _next_ permutation, not just _any_ larger permutation.

**Time Complexity:** $O(n)$ because each step involves at most one pass through the array.

## Code

```python
class Solution:
    def nextPermutation(self, arr):
        n = len(arr)
        i = n - 2
        while i >= 0 and arr[i] >= arr[i + 1]:
            i -= 1
        if i >= 0:
            j = n - 1
            while arr[j] <= arr[i]:
                j -= 1
            arr[i], arr[j] = arr[j], arr[i]
        arr[i + 1:] = reversed(arr[i + 1:])
```

## Related

- [[heap's algorithm\|heap's algorithm]]
