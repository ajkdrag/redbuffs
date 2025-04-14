---
{"publish":true,"tags":["type/problem"],"platform":"Naukri","link":"https://www.naukri.com/code360/problems/minimise-max-distance_7541449?leftPanelTabValue=PROBLEM","PassFrontmatter":true,"created":"2025-03-12T12:21:51.138+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]

We need to place `k` new gas stations on the X-axis such that the maximum distance between adjacent gas stations is minimized. The given gas stations are sorted, and we can place the new stations at non-integer positions.

## Idea

The key idea is to determine the minimum possible value of the maximum distance (`dist`) between adjacent gas stations after placing `k` new stations. We use binary search to "guess" a value for `dist` and check if it is feasible to place the new stations such that all adjacent distances are less than or equal to this guessed value.

The search starts with `low` as 0.0 and `high` as the maximum initial gap between consecutive gas stations. This ensures we consider the worst-case scenario initially. 1. For each interval between consecutive gas stations, we calculate the number of new stations required to split the interval into segments of **at most** `mid` length. This is done using the formula: `ceil(d / mid - 1)`, where `d` is the interval length. If the total required stations exceed `k`, the current `mid` is not feasible.

**Adjusting Search Bounds**: The binary search iteratively adjusts the bounds based on whether the current `mid` is feasible. If feasible, it reduces the upper bound; otherwise, it increases the lower bound. This continues until the bounds are _sufficiently close_ (within `1e-7`), ensuring precision in the result.

**Time Complexity:** $O(n \log(\text{max\_gap}))$
**Space Complexity:** $O(1)$

## Code

```cpp
bool check(double mid, vector<int> &arr, int k) {
  int required = 0;
  int n = arr.size();
  for (int i = 0; i < n - 1; ++i) {
    double d = arr[i + 1] - arr[i];
    if (d <= mid)
      continue; // No stations needed here

    // To ensure each gap is <= mid, we need to insert:
    // required stations = ceil(gap / mid) - 1.
    double s_needed = (d / mid) - 1;
    int s = ceil(s_needed);
    s = max(0, s);
    required += s;
    if (required > k)
      return false; // Early exit if already over
  }
  return required <= k;
}

double minimiseMaxDistance(vector<int> &arr, int k) {
  double lo = 0;
  double hi = 0;
  int n = arr.size();
  for (int i = 0; i < n - 1; ++i) {
    hi = max(hi, double(arr[i + 1] - arr[i]));
  }

  double ans = hi;
  double eps = 1e-7;
  while (hi - lo >= eps) {
    double mid = lo + (hi - lo) / 2.0;
    if (check(mid, arr, k)) {
      ans = mid;
      hi = mid - eps;
    } else {
      lo = mid + eps;
    }
  }
  return ans;
}
```

## Related

- [[6 Problems/painter's partition problem\|painter's partition problem]]
