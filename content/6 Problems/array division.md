---
{"publish":true,"tags":["type/problem"],"platform":"CSES","link":"https://cses.fi/alon/task/1085","PassFrontmatter":true,"created":"2025-03-28T10:54:15.755+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]

You are given an array containing $n$ positive integers. Your task is to divide the array into $k$ subarrays so that the maximum sum in a subarray is as small as possible.

## Idea

We can use [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]] to find the minimum possible value for the largest sum of the subarrays. The search space is between the **maximum** element of the array and the **sum of all elements**. For a given `mid` value, we check if it's possible to divide the array into `k` or fewer subarrays such that the sum of each subarray is not greater than `mid`. This problem is basically the [[6 Problems/painter's partition problem\|painter's partition problem]] in disguise.

**Time Complexity**: $O(n \log(\sum_{i=0}^{n} a_i))$, where $n$ is the number of elements in the array and $a_i$ is the i-th element.
**Space Complexity**: $O(1)$

## Code

```cpp
bool check(ll mid, vector<int> &arr, int k) {
  ll runner = 0;
  int count = 1;
  for (auto &x : arr) {
    if (runner + x > mid) {
      runner = x;
      count++;
    } else {
      runner += x;
    }
  }
  return count <= k;
}

void solve() {
  int n, k;
  cin >> n >> k;
  vector<int> arr(n);
  ll lo = 0, hi = 0;
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
    lo = max(int(lo), arr[i]);
    hi += arr[i];
  }

  ll ans = hi;
  while (lo <= hi) {
    ll mid = lo + (hi - lo) / 2;
    if (check(mid, arr, k)) {
      ans = mid;
      hi = mid - 1;
    } else
      lo = mid + 1;
  }
  cout << ans << endl;
}
```

## Related

- [[6 Problems/painter's partition problem\|painter's partition problem]]
- [[6 Problems/fill the containers\|fill the containers]]
