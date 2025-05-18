---
{"publish":true,"created":"2025-03-28T17:38:14.152+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[2 Zettels/greedy algorithm\|greedy algorithm]]

Given a sorted array of `n` (odd) elements and `k` operations where each op can increment any element by 1, find the maximum possible median after applying at most `k` operations.

## Idea

Sort the array in non-decreasing order. In the new array $b_1, b_2, \ldots, b_n$, you can apply binary search on the ans. For a given median value $x$, the number of ops:

$$
\begin{align*}
\text{ops}&=\sum^{n}_{i=\frac{n+1}{2}} (\max (x, b_i) - b_i) \\
&=\sum^{n}_{i=\frac{n+1}{2}} \max (0, x-b_i)
\end{align*}
$$

If this value is more than $k$, $x$ can't be median, otherwise it can.

The key insight is to:

- Only increase elements from median position onwards
- Each element in upper half needs `max(0, x - arr[i])` operations

**Time**: $O(n \log n)$ for sorting + $O(n \log 10^9)$ for binary search
**Space Complexity**: $O(1)$ additional space

## Code

```cpp
bool check(ll mid, vector<int> &arr, int k) {
  int n = arr.size();
  ll sum = 0;
  for(int i = n/2; i < n; ++i){
    sum += max(mid, ll(arr[i])) - arr[i];
  }

  return sum <= k;
}

void solve() {
  int n, k;
  cin >> n >> k;
  vector<int> arr(n);
  int mx = INT_MIN;
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
    mx = max(mx, arr[i]);
  }
  sort(all(arr));

  ll lo = arr[n / 2];
  ll hi = mx + k;
  ll ans = lo;
  while (lo <= hi) {
    ll mid = lo + (hi - lo) / 2;
    if (check(mid, arr, k)) {
      ans = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  cout << ans << '\n';
}
```

## Related

- [[6 Problems/median of the uniqueness array\|median of the uniqueness array]]
- [[6 Problems/multiplication table\|multiplication table]]
