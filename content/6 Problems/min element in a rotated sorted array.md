---
{"publish":true,"tags":["type/problem"],"platform":"Leetcode","link":"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/","PassFrontmatter":true,"created":"2025-02-22T13:25:53.672+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]

## Idea

Straightforward [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]] application. The key observation here is that the minimum element in a rotated sorted array is the **first element that is smaller than the last element** of the array.

**Time Complexity:** $O(\log n)$

## Code

```cpp
class Solution {
public:
  bool check(vector<int> &nums, int mid) {
    return nums[mid] < nums[nums.size() - 1];
  }

  int findMin(vector<int> &nums) {

    int n = nums.size();
    int lo = 0;
    int hi = n - 1;
    int ans = nums[hi];

    while (lo <= hi) {
      int mid = lo + (hi - lo) / 2;
      if (check(nums, mid)) {
        ans = nums[mid];
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    }
    return ans;
  }
};
```

## Related

- [[6 Problems/min element in a rotated sorted array with duplicates\|min element in a rotated sorted array with duplicates]]
