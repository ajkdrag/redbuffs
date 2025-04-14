---
{"publish":true,"tags":["type/problem"],"platform":"CSES","link":"https://cses.fi/alon/task/1620/","PassFrontmatter":true,"created":"2025-02-18T21:20:44.436+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]]

We are given $n$ machines and a target number of products $t$. Each machine $i$ takes $p_i$​ seconds to produce one product. We need to find the minimum time to produce at least $t$ products using all machines working simultaneously.

## Idea

The problem exhibits a crucial monotonic property. If it is possible to produce $t$ products in time $x$, then it is also possible to produce $t$ products in any time $x'>x$. This monotonicity allows us to efficiently search for the minimum time using [[binary search\|binary search]] on answer space (time).

The lower bound can be 0. For the upper bound, consider the fastest machine (minimum $p_i$​). In the worst case, we can use only this fastest machine to produce all $t$ products, i.e $t\times p_{min}$​. At each step of our binary search, if `check(mid)` is `true`, it means we can produce `t` (atleast) products in time `mid`. So, the minimum time might be `mid` or something smaller (search in left half). If `check(mid)` is `false`, it means we cannot produce `t` products in time `mid`. So, we need more time (search in right half).

The `check` func: total number of products produced by all machines in time $x$ is the sum of products from each machine:

$$
\text{total\_products}(x) = \sum_{i=1}^{n} \left\lfloor \frac{x}{p_i} \right\rfloor
$$

The `check(x)` function returns `true` if $\text{total\_products}(x)\ge t$, and `false` otherwise.

**Time Complexity:** $O(n \log(t \times p_{min}​))$

## Code

```cpp
bool check(ll x, ll t, vector<int> &arr) {
  // check if possible to make atleast `t` products in time `x`
  ll products = 0;
  for (int &val : arr) {
    products += (x / val);
  }
  return products >= t;
}

void solve() {
  int n, t;
  cin >> n >> t;

  vector<int> arr(n);
  int best = INT_MAX;
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
    best = min(best, arr[i]);
  }

  ll lo = 0;
  ll hi = 1LL * t * best;
  ll ans = hi;

  while (lo <= hi) {
    ll mid = lo + (hi - lo) / 2;
    if (check(mid, t, arr)) {
      ans = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  cout << ans << endl;
}
```

## Related

- [[6 Problems/painter's partition problem\|painter's partition problem]]
- [[6 Problems/kth sum value\|kth sum value]]
