---
{"publish":true,"tags":["type/problem"],"platform":"UVa","link":"https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=1282","PassFrontmatter":true,"created":"2025-03-26T09:55:13.207+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[coordinate geometry\|coordinate geometry]]

Solve the equation:

$$
p * e^{-x} + q * \sin(x) + r * \cos(x) + s * \tan(x) + t * x^2 + u = 0
$$

where $0 \le x \le 1$.

## Idea

Since f(x) is a non-increasing function on $[0, 1]$, [[2 Zettels/binary search on real domain\|binary search on real domain]] can be used to find the root. Note that it can be the case that there's no solution:

- f(0) is -ve, so as we go from 0 to 1, our function will continue to be -ve
- f(1) is +ve, implies that function is +ve for all values in $[0, 1]$

## Code

```cpp
double eval(double x, double p, double q, double r, double s, double t,
            double u) {
  return p * exp(-x) + q * sin(x) + r * cos(x) + s * tan(x) + t * x * x + u;
}

bool check(double x, double p, double q, double r, double s, double t,
           double u) {
  return eval(x, p, q, r, s, t, u) >= 0;
}

void solve() {
  double p = -1, q, r, s, t, u;
  cin >> p >> q >> r >> s >> t >> u;
  if (p == -1)
    return;
  double lo = 0, hi = 1;
  double ans, eps = 1e-6;

  // comparison with eps just for precision safety
  if (eval(1, p, q, r, s, t, u) >= eps or eval(0, p, q, r, s, t, u) < -eps) {
    cout << "No solution" << endl;
  } else {
    for (int i = 0; i < 50; ++i) {
      double mid = (lo + hi) / 2;
      if (check(mid, p, q, r, s, t, u)) {
        lo = mid;
        ans = lo;
      } else {
        hi = mid;
      }
    }
    cout << fixed << setprecision(4) << ans << endl;
  }
}
```

## Related
