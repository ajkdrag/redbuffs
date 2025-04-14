---
{"publish":true,"tags":["type/problem"],"platform":"Codeforces","link":"https://codeforces.com/problemset/problem/817/C","PassFrontmatter":true,"created":"2025-03-26T10:31:03.766+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[basic arithmetic\|basic arithmetic]]

Find the count of _really big numbers_ that are $\le n$. A number $x$ is _really_ big if the difference between $x$ and the sum of its digits (in decimal representation) is not less than $s$.

# Idea

The function $f(x - \text{sod(x)})$ is monotonic and non-decreasing. Thus, we can apply [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]] to find the smallest $x$ (within $n$) that is _really big_. Note that if $n$ itself isn't _really big_, then no number $\le n$ will be valid, otherwise, we know $n$ is the largest valid number. Finally, the count of valid numbers will be:

$$
n - \text{(smallest valid x)} + 1
$$

**Time Complexity:** $O(D \log(n))$ where $D$ is the max number of digits (18 for the given problem, since $n\le 10^{18}$).
**Space Complexity:** $O(1)$.

## Code

```cpp
bool check(ll x, ll s) {
  ll sod = 0;
  ll og = x;
  while (x) {
    sod += x % 10;
    x /= 10;
  }
  return og - sod >= s;
}

void solve() {
  ll n, s;
  cin >> n >> s;

  ll lo = 0;
  ll hi = n;

  ll smallest = 0;
  ll largest = n;
  if (not check(largest, s)) {
    cout << 0 << endl;
  } else {
    while (lo <= hi) {
      ll mid = lo + (hi - lo) / 2;
      if (check(mid, s)) {
        smallest = mid;
        hi = mid - 1;
      } else
        lo = mid + 1;
    }
    cout << largest - smallest + 1 << endl;
  }
}
```

## Related
