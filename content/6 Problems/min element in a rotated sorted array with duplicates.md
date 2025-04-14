---
{"publish":true,"tags":["type/problem"],"platform":"Leetcode","link":"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/description/","PassFrontmatter":true,"created":"2025-02-23T10:01:57.948+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]

## Idea

This problem is similar to [[6 Problems/min element in a rotated sorted array\|min element in a rotated sorted array]], but `nums` contain duplicates. This means that we can't apply the [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]] like before. For cases: `[4, 1, 3, 3, 3]`, `[4, 5, 3, 3, 3]`, the middle element is equal to both the last element, so we can't decide which half to "choose" by comparing `nums[mid]` with any of the endpoints. Thus, for such a case, best we can do is skip the last element and shrink search space by _just one element_.

Thus, we must add extra logic to handle ambiguous cases:

1. **When `nums[mid] < nums[hi]`:**  
   This guarantees that the minimum is at `mid` or to its left, so update your candidate answer and move `hi` to `mid`
2. **When `nums[mid] > nums[hi]`:**  
   The minimum must lie to the right of `mid`, so set `lo` to `mid + 1`
3. **When `nums[mid] == nums[hi]`:**  
   This is the ambiguous case. Here, you can't tell which side contains the minimum, so you shrink the search space by decrementing `hi`

> [!Warning]
> Note that the logic here is to compare `nums[mid]` with `nums[hi]`and not with `nums[n-1]`.

## Code

Relies on the [[2 Zettels/vanilla binary search implementation\|vanilla binary search implementation]]

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int lo = 0, hi = nums.size() - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < nums[hi]) {
                hi = mid;
            } else if (nums[mid] > nums[hi]) {
                lo = mid + 1;
            } else {
                // nums[mid] == nums[hi]: we cannot decide, shrink the search space.
                hi--;
            }
        }
        return nums[lo];
    }
};
```

## Related
