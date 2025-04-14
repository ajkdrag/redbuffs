---
{"publish":true,"tags":["type/problem"],"platform":"Leetcode","link":"https://leetcode.com/problems/search-in-rotated-sorted-array/description/","PassFrontmatter":true,"created":"2025-02-23T10:35:40.765+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]

## Idea

Few different ways to write the conditions. One simple way is to think as such:

- If target is larger than middle element, it will always be on the right half, _unless_, it's also larger than `nums[hi]`, case: `[5, 1, 2, 3, 4], target=5`.
- Similarly, if target is smaller than middle element, it will always be on the left half, _unless_, it's also smaller than `nums[lo]`, case: `[3, 4, 5, 1, 2], target=1`

Another way is to think in terms of "finding the sorted half":

- If `nums[mid] <= nums[hi]`, then the **right half is sorted**. If the target is within this range, we search in the right half (`lo = mid + 1`), otherwise, we go left (`hi = mid - 1`)
- If `nums[mid] >= nums[lo]`, then the **left half is sorted**. If the target is within this range, we continue on the left (`hi = mid - 1`), otherwise, we move to the right (`lo = mid + 1`)

## Code

```python
# Approach 1
def search(nums, target):
    lo = 0
    hi = len(nums) - 1

    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] <= nums[hi] < target:
            hi = mid - 1
        elif nums[mid] < target:
            lo = mid + 1
        elif target < nums[lo] <= nums[mid]:
            lo = mid + 1
        elif target < nums[mid]:
            hi = mid - 1
    return -1

# Approach 2
def search(nums, target):
    lo, hi = 0, len(nums) - 1

    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid

        # Determine which half is sorted
        if nums[lo] <= nums[mid]:  # Left half is sorted
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:  # Right half is sorted
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1

```

now, if there's a variation: [find target in rotated sorted array with duplicates](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/description/), there can be cases where we can't figure out which half is "sorted":
![](https://res.cloudinary.com/dcameztw9/image/upload/v1740316099/find%20target%20in%20a%20rotated%20sorted%20array-l0aeix.webp)

If such a case is encountered in our search space, we do `hi--` and `lo++`:

```python
if nums[mid] == nums[lo] == nums[hi]:
    hi -= 1
    lo += 1
```

Adding above block works for both approaches discussed previously.

## Related
