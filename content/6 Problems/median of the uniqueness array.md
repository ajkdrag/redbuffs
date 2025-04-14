---
{"publish":true,"tags":["type/problem"],"platform":"Leetcode","link":"https://leetcode.com/problems/find-the-median-of-the-uniqueness-array/description/","PassFrontmatter":true,"created":"2025-03-04T10:55:46.618+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]]
> - [[sliding window\|sliding window]]

You are given an integer array `nums`. The **uniqueness array** of `nums` is the sorted array that contains the number of distinct elements of all the subarrays of `nums`. In other words, it is a sorted array consisting of `distinct(nums[i..j])`, for all `0 <= i <= j < nums.length`.

Here, `distinct(nums[i..j])` denotes the number of distinct elements in the subarray that starts at index `i` and ends at index `j`.

Return the **median** of the **uniqueness array** of `nums`

## Idea

Employ binary search on answer. The minimum number of distinct elements in any subarray is 1, and the maximum is the number of unique elements in the entire input array nums. Use binary search to find the smallest `k` such that at least half of the subarrays have at most `k` distinct elements. This `k` will be our median.

To count the number of subarrays with at most `k` distinct elements, we can use a sliding window technique. For current index `right`, we maintain the window `[left, right]` and keep track of the distinct elements within this window using a frequency map or a set. If the number of distinct elements exceeds `k`, we shrink the window from the left until the condition is met again. Now, all subarrays starting from range `[left, right]` and ending at `right` satisfy the condition (number of distinct elements is at most `k`). Thus, for each `right` index, we can accumulate the count of valid subarrays.

**Time Complexity:** $O(n\log{n})$
**Space Complexity:** $O(n)$

## Code

```python
def atmost_k_unique(nums, k):
    n = len(nums)

    left, right = 0, 0
    seen = defaultdict(int)
    total = 0
    while right < n:
        curr = nums[right]
        seen[curr] += 1

        while len(seen) > k:
            # see if we can shrink the window
            leftval = nums[left]
            if seen[leftval] == 1:
                seen.pop(leftval)
            else:
                seen[leftval] -= 1
            left += 1

        total += right - left + 1
        right += 1
    return total


def solve(nums):
    num_uniques = len(set(nums))

    left, right = 1, num_uniques
    n = len(nums)
    num_subarrays = (n * (n + 1)) // 2
    # median has half items to its left
    target = num_subarrays // 2 + (1 if num_subarrays % 2 == 1 else 0)
    ans = target
    while left <= right:
        mid = (left + right) // 2
        if atmost_k_unique(nums, mid) >= target:
            ans = mid
            right = mid - 1
        else:
            left = mid + 1
    print(ans)

```

## Related
