---
{"publish":true,"created":"2025-03-16T12:41:38.497+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[binary search\|binary search]]

- You are given **n** friends at positions $x_i$ on a line
- Each friend has a maximum speed $v_i$

**Goal:** Find the minimum time needed for all friends to meet at some point on the line.

## Idea

We can leverage [[2 Zettels/binary search on real domain\|binary search on real domain]] (search space is the range of time). For each candidate time $t$, we need to check if there exists a meeting point such that all friends can reach it within time $t$.

For a given time $t$, each friend $i$ can reach any point within the interval:

$$
[x_i - v_i * t, x_i + v_i * t]
$$

Therefore, a meeting point exists if and only if the [[2 Zettels/intersection of intervals\|intersection of intervals]] is non-empty. This can be checked by:

- Find the rightmost left endpoint (`maxL`) and leftmost right endpoint (`minR`)
- If the leftmost right endpoint is to the right of the rightmost left endpoint, then the intersection is non-empty, i.e. `maxL <= minR`

**Time Complexity:** $O(n \log D)$ where $D$ is the range of possible times. The binary search contributes a factor of $O(\log D)$, and the feasibility check takes $O(n)$ time.
**Space Complexity:** $O(n)$ for storing the friend data.

## Code

```cpp
const double eps = 1e-7;

struct Friend {
  double x, v;
};

bool check(double t, const vector<Friend> &friends) {
  double maxL = -1e18, minR = 1e18;
  for (const auto &f : friends) {
    double dist = f.v * t;
    maxL = max(maxL, f.x - dist);
    minR = min(minR, f.x + dist);
  }
  return maxL <= minR;
}

int solve() {
  int n;
  cin >> n;
  vector<Friend> friends(n);
  for (auto &f : friends)
    cin >> f.x;
  for (auto &f : friends)
    cin >> f.v;

  double lo = 0, hi = 1e9, ans = 1e9;
  while (hi - lo > eps) {
    double mid = lo + (hi - lo) / 2.0;
    if (check(mid, friends)) {
      ans = mid;
      hi = mid;
    } else
      lo = mid;
  }

  cout << fixed << setprecision(10) << ans << endl;
  return 0;
}
```

## Related

- [[6 Problems/minimize max dist to gas station\|minimize max dist to gas station]]
