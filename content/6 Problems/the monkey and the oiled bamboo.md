---
{"publish":true,"tags":["type/problem"],"platform":"UVa","link":"https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=3183","PassFrontmatter":true,"created":"2025-03-26T11:29:46.350+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]

The problem asks us to find the minimum "strength factor" $k$ needed to climb a ladder with varying rung heights. You start on the ground (height 0). For each jump to the next rung, you can jump at most $k$ feet. If you jump exactly $k$ feet, $k$ is decremented by 1. If you jump less than $k$ feet, $k$ remains the same. Given the heights of the rungs, find the smallest initial $k$ that allows you to reach the top rung.

## Idea

Use [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]] to find min $k$ (since it's monotonic: if $k$ is feasible, then values $\ge k$ are also feasible). The `check` function simulates the climb for a given `k` and returns true if the climb is possible, and false otherwise. For each `mid` value (potential `k`), if `check` returns `true`, try to minimize `k` further. Otherwise, search in the upper half.

**Time Complexity:** $O(n \log 10^{18} )$ since we are binary searching over $[1, 10^{18}]$
**Space Complexity:** $O(1)$ (no extra space apart from storing the values in array)

## Code

```cpp
bool check(vector<int> &arr, ll k) {
  int prev = 0;
  for (auto &x : arr) {
    if (k < x - prev)
      return false;
    if (k == x - prev)
      k--;
    prev = x;
  }

  return true;
}

void solve(int caseid) {
  int n;
  cin >> n;
  vector<int> arr(n);
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
  }

  ll lo = 1;
  ll hi = 1e18;
  ll ans = hi;
  while (lo <= hi) {
    ll mid = lo + (hi - lo) / 2;
    if (check(arr, mid)) {
      ans = mid;
      hi = mid - 1;
    } else
      lo = mid + 1;
  }

  cout << "Case " << caseid << ": " << ans << endl;
}
```

## Related
