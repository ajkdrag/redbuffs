---
{"publish":true,"created":"2025-04-01T15:20:41.027+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[basic arithmetic\|basic arithmetic]]

Given $N$ balls with colors represented by an array $A$ and an integer $k$, determine the maximum number of filled baskets you can create. A basket is considered filled if it contains at least $k$ balls of different colors.

## Idea

Observe that if some number of baskets $X$ is valid, then any number $\le X$ is also valid. This monotonicity allows us to leverage the [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]] on the answer space (number of baskets). The `check(baskets, counts, k)` function will determine whether it is possible to fill some number of `baskets` (say $b$), given the counts of each color and the minimum required unique colors `k`.

The `check` function would iterate through the color counts and, for each color, use **at most** $b$ balls of that color (note that if we have, we _can_ use more balls, but they will not contribute anything since we are interested in balls of different colors within a basket). We accumulate the total number of balls used and check if it's enough to fill the required number of baskets each having `k` unique colors.

The feasibility condition for a given number of baskets $b$ is: $$ \sum\_{i=1}^{m} \min(c_i, b) \;\; \ge \;\; b \times k. $$ If this sum is large enough, we can form $b$ baskets, each having at least $k$ distinct colors.

**Time Complexity:** $O(m \log(\text{maxBaskets}))$, where $m$ is the number of unique colors, and $\text{maxBaskets}$ is the maximum possible number of baskets (which is at most $N/k$).
**Space Complexity:** $O(m)$

## Code

```cpp
bool check(int baskets, vector<int> &counts, int k) {
  // 1 2 | 1 3 | 2 3
  // 1 2 3 | 1 2 3
  ll used = 0;
  for (auto &cnt : counts) {
    used += min(cnt, baskets);
  }

  return used >= 1LL * k * baskets;
}

void solve() {
  int n, k;
  cin >> n >> k;
  int x;
  vector<int> counts;
  map<int, int> freqs;
  for (int i = 0; i < n; ++i) {
    cin >> x;
    freqs[x]++;
  }

  for (auto &el : freqs)
    counts.pb(el.second);

  int lo = 1;
  int hi = n / k;
  int ans = 0;

  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (check(mid, counts, k)) {
      ans = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  cout << ans << endl;
}

```

## Related

- [[6 Problems/distinct numbers\|distinct numbers]]
  - more complex version of the problem, but core logic is similar
