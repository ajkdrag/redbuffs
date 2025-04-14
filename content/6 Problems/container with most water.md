---
{"publish":true,"tags":["type/problem"],"platform":"Leetcode","link":"https://leetcode.com/problems/container-with-most-water/description/","PassFrontmatter":true,"created":"2025-04-06T08:49:07.486+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/two pointers technique\|two pointers technique]]
> - [[2 Zettels/greedy algorithms\|greedy algorithms]]

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `ith` line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

## Idea

### Approach 1 (2 Pointers)

We can use the [[2 Zettels/two pointers at opposite ends\|two pointers at opposite ends]] approach, starting with the widest container (leftmost and rightmost lines). Then, we move the pointer with the smaller height towards the center. This is because moving the taller pointer will _always_ result in a smaller or equal area (decrease in width but no increase in min height), while moving the shorter pointer has the _potential_ to increase the height and thus the area (greedy step).

**Time Complexity:** $O(n)$
**Space Complexity:** $O(1)$

### Approach 2 (Sorting)

This approach sorts the heights along with their original indices. The key insight is that the largest possible area for any given height `h` is obtained by spanning the maximum possible width (i.e., from the leftmost to rightmost index where heights >= `h` exist, since `h` is limiting).

For each height `h`, we want to find the leftmost and rightmost indices that have heights at least `h`. As we iterate through the sorted heights, we maintain an _ordered set_ of indices we've encountered so far. For the current height, the maximum width is determined by the difference between the maximum and minimum index in our set.

**Why Sorting Works:**  
Since we process tallest heights first, we'll immediately find the maximum possible width for each height. The greedy nature ensures we check all width-maximizing combinations without exhaustive search.

## Code

```cpp
// Approach 1 (2 pointers)
int solve(vector<int> arr) {
  int l = 0;
  int r = arr.size() - 1;

  int ans = 0;
  while (l <= r) {
    int left = arr[l];
    int right = arr[r];
    int tres = (r - l) * min(left, right);
    ans = max(ans, tres);
    if (left < right) l++;
    else r--;
  }
  return ans;
}

// Approach 2 (Sorting)
int solve_nlogn(vector<int> &heights) {
  int n = heights.size();
  vector<pair<int, int>> indexed_heights;
  for (int i = 0; i < n; ++i) {
    indexed_heights.push_back({heights[i], i});
  }

  // Sort in descending order
  sort(indexed_heights.rbegin(), indexed_heights.rend());

  set<int> indices;
  int max_area = 0;

  for (auto &[height, index] : indexed_heights) {
    indices.insert(index);
    int min_index = *indices.begin();
    int max_index = *indices.rbegin();
    max_area = max(max_area, height * (max_index - min_index));
  }

  return max_area;
}
```

## Related

```

```
