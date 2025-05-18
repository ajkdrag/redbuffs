---
{"publish":true,"created":"2025-03-22T21:55:07.022+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[basic arithmetic\|basic arithmetic]]

Given two arrays _A_ and _B_ of size _N_ and an integer _K_. You have to select _K_ indexes $i_1, i_2, i_3, \dots, i_K$ such that

$$
\frac{A[i_1] + A[i_2] + A[i_3] + \dots + A[i_K]}{B[i_1] + B[i_2] + B[i_3] + \dots + B[i_K]}
$$

is maximum. $N, A_i, B_i$ are all in the range $[1, 10^4]$ and $1\le K\le N$.

## Idea

We can use binary search to find the maximum possible fraction. Thinking in terms of the [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]], we're searching for the largest `x` such that a fraction greater than or equal to `x` can be formed. This is like finding the "last true" in a boolean array where `check(x)` is true if such a fraction exists. Thus, for a candidate $x$, we want to determine if:

$$
\frac{A[i_1] + A[i_2] + \dots + A[i_K]}{B[i_1] + B[i_2] + \dots + B[i_K]} \ge x
$$

This inequality can be rearranged to:

$$
\sum_{j=1}^{K} A[i_j] \ge x \cdot \sum_{j=1}^{K} B[i_j]
$$

Or further, to:

$$
\sum_{j=1}^{K} (A[i_j] - x \cdot B[i_j]) \ge 0
$$

For a given `x`, the `check(x)` function calculates `A[i] - x * B[i]` for all `i`. Next, we [[2 Zettels/find k largest elements in an array\|find k largest elements in an array]] (used sorting here) and check if their sum $\ge 0$.

> [!tip] Sufficiency of k-largest elements check
> By choosing the `k` largest values of `A[i] - x * B[i]`, we are effectively maximizing the left-hand side of the inequality $\sum_{j=1}^{K} (A[i_j] - x \cdot B[i_j]) \ge 0$. If the sum of these `k` largest values is non-negative, it implies that there exists a combination of `k` indices for which the inequality holds true. Conversely, if the sum of the `k` largest values is negative, no such combination exists, because any other combination would necessarily have a smaller sum.

If sum $\ge 0$ is `true`, it means we can achieve a fraction of at least `x`, so it makes sense to try a larger `x`, otherwise, we need to check with a smaller `x`. Since `x` can be a floating point value, we need to apply [[2 Zettels/binary search on real domain\|binary search on real domain]].

**Time Complexity**: $O(50\cdot N \log N)$. The `check` func uses sorting to find the top k elements resulting in $O(N\log{N})$ and the binary search runs for 50 iters in our implementation.
**Space Complexity**: $O(N)$ due to the auxiliary array used in the `check` function.

## Code

```cpp
bool check(double mid, vector<int> &a, vector<int> &b, int k) {
  int n = a.size();
  vector<double> aux(n);

  for (int i = 0; i < n; ++i) {
    aux[i] = a[i] - mid * b[i];
  }

  // k largest elements
  sort(all(aux), greater<double>());

  double total = 0;
  while (k--) {
    total += aux[k];
  }

  return total >= 0;
}

void solve() {
  int n, k;
  cin >> n >> k;
  vector<int> a(n), b(n);
  for (int i = 0; i < n; ++i) {
    cin >> a[i];
  }
  for (int i = 0; i < n; ++i) {
    cin >> b[i];
  }

  double lo = 0;
  double hi = 1e4;
  double eps = 1e-6;
  double ans = 0;
  int max_iters = 50;
  while (max_iters--) {
    double mid = (lo + hi) / 2.0;
    if (check(mid, a, b, k)) {
      ans = mid;
      lo = mid + eps;
    } else {
      hi = mid - eps;
    }
  }

  cout << fixed << setprecision(6) << ans << '\n';
}
```

## Related

- [[6 Problems/good pairs\|good pairs]]
