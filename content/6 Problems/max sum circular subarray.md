---
{"publish":true,"tags":["type/problem"],"platform":"Leetcode","link":"https://leetcode.com/problems/maximum-sum-circular-subarray/description/","PassFrontmatter":true,"created":"2025-02-21T20:51:54.463+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/circular and rotated array problems\|circular and rotated array problems]]
> - [[2 Zettels/prefix sums\|prefix sums]]
> - [[sliding window\|sliding window]]

Given a circular integer array `nums` of length `n`, find the maximum possible sum of a non-empty subarray.

> [!Example] > **Input:** `nums = [5, -3, 5]`  
> **Output:** `10`  
> **Explanation:** The subarray `[5, 5]` has the maximum sum `5 + 5 = 10`.

## Idea

Since the array is circular, a maximum sum subarray can either:

1. Be a regular subarray (without wrapping).
2. Wrap around the end and start of `nums`.

### Approach 1

To handle wrap-around subarrays, we can "unwrap" the circular array by duplicating it. That is, we construct an extended array: `A' = nums + nums`. This allows us to find a valid subarray sum using a **prefix sum approach** within a sliding window of length at most `n`.

- Compute prefix sums for `A'` to quickly calculate any subarray sum
- For each ending index `j` in `A'`, find the **smallest** prefix sum in the window `[j-n, j-1]`
- The max subarray sum ending at `j` is then: $\text{max sum} = \text{prefix}[j] - \min(\text{prefix}[j-n], ..., \text{prefix}[j-1])$
  - Additionally, only consider a "valid" window i.e. `j-1, j-2, ... max(0, j-n)`
- Efficiently track the minimum prefix sum [[2 Zettels/using deque for sliding window problems\|using deque for sliding window problems]]

**Example Walkthrough:**
Consider `nums = [2, -2, -3]`.  
Extended array: `A' = [2, -2, -3, 2, -2, -3]`  
Prefix sums: `p = [0, 2, 0, -3, -1, -3, -6]`

For `j=4`, we check the range `[1,3]` in `p`:

- `p[4] - p[1]` gives the subarray sum for `[1,3]` in `A'`, i.e. `-3`
- `p[4] - p[3]` gives the subarray sum for `[3,3]`, i.e. `2`
- This ensures we consider subarrays of all possible lengths up to `n`

**Implementation Tips:**

- Use a **deque** to maintain a **monotonic increasing order** of prefix sums.
- Remove out-of-window indices from the front.
- Always maintain the smallest prefix sum at the front of the deque.
- Keep the deque sorted by removing larger elements before inserting the current index.

**Time Complexity:** $O(n)$
**Space Complexity:** $O(n)$

### Approach 2: Kadane's algorithm

Observe that the maximum circular subarray is either:

- A **non-wrapping subarray** (found via [[kadane's algorithm\|kadane's algorithm]]), or
- A **wrapping subarray** (total sum minus the minimum non-wrapping subarray)

A wrapping subarray excludes a contiguous non-wrapping subarray. By subtracting the smallest possible sum (`min_subarray`), the remaining elements form the largest possible wrapping subarray. Thus, In this case, we handle the 2 cases separately:

1. Compute `max_normal`: Use Kadane's algorithm to find the max subarray sum
2. Compute `min_subarray`: Modify Kadane's algorithm to find the min subarray sum
3. Compute `total_sum`: Sum of all elements in the array
4. Edge Case handling:
   - If all elements are negative (`max_normal < 0`), return `max_normal` since any subarray of size > 1 will be even smaller
   - Otherwise, return `max(max_normal, total_sum - min_subarray)`

**Time Complexity:** $O(n)$
**Space Complexity:** $O(1)$

## Code

```python
# Approach 1 (prefix sums + sliding window + deque)
def solve(nums):
    n = len(nums)
    # Build prefix sum array of size 2*n+1 with p[0] = 0.
    p = [0] * (2 * n + 1)

    for i in range(1, 2 * n + 1):
        p[i] = p[i - 1] + nums[(i - 1) % n]

    res = -float('inf')
    dq = deque([0])  # Start with index 0 in the deque

    # For each index 'i', our valid window for start indices is [max(0, i-n), i-1]
    for i in range(1, 2 * n + 1):
        # Remove indices that are no longer in the window.
        while dq and dq[0] < i - n:
            dq.popleft()
        # p[dq[0]] is the smallest prefix sum in the valid window,
        # so p[i] - p[dq[0]] gives the maximum subarray sum ending at i-1.
        res = max(res, p[i] - p[dq[0]])
        # Maintain deque in increasing order of prefix sums.
        while dq and p[i] <= p[dq[-1]]:
            dq.pop()
        dq.append(i)
    return res


# Approach 2
def solve(nums):
    if not nums:
        return 0

    # Kadane's for max_normal and total_sum
    max_current = max_global = nums[0]
    min_current = min_global = nums[0]
    total_sum = nums[0]

    for num in nums[1:]:
        # Update max subarray
        max_current = max(num, max_current + num)
        max_global = max(max_global, max_current)

        # Update min subarray
        min_current = min(num, min_current + num)
        min_global = min(min_global, min_current)

        total_sum += num

    # Handle all negatives
    if max_global < 0:
        return max_global

    return max(max_global, total_sum - min_global)
```

## Related
