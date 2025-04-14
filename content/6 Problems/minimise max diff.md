---
{"publish":true,"tags":["type/problem"],"platform":"AlgoZenith","link":null,"PassFrontmatter":true,"created":"2025-03-20T19:40:05.144+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]

You are given $N$ distinct points on the number line in a sorted array $A$. You can place at most $K$ more points on the line (integer coordinates only). You have to make the maximum separation between any two consecutive points in the final configuration as minimum as possible. Output this minimal value.

**Note:** You can place the points anywhere you like, but you cannot place more than one point at the same position on the line.

**Input Format:**

- The first line contains an integer $T$, the number of test cases $(1 \leq T \leq 10000)$
- The first line of each test case contains two space-separated integers $N$, $K$, where $2 \leq N \leq 10^5$, $0 \leq K \leq 10^9$
- The next line contains $N$ space-separated distinct integers $A_i$ ( $0 \leq A_i \leq 1e9$ )
- The sum of $N$ across all test cases does not exceed $10^6$

**Output Format:**
For each test case, output the minimal maximum separation between any two consecutive points possible, in a new line.

**Constraints:**

- $1 \leq T \leq 10000$
- $2 \leq N \leq 10^5$
- $0 \leq K \leq 10^9$
- $0 \leq A_i \leq 10^9$
- The sum of $N$ across all test cases does not exceed $10^6$

## Idea

This problem is a classic application of binary search on the answer space. We want to minimize the maximum difference between consecutive elements. This suggests a monotonic relationship: if a maximum difference of mid is feasible (we can achieve it with at most K added points), then any difference larger than mid is also feasible. Conversely, if mid is infeasible, then any difference smaller than mid is also infeasible. This creates the `[F, F, ..., F, T, T, ..., T]` pattern suitable for the binary search boolean array framework, where true represents a feasible maximum difference.

- **Answer Space:** Search space is the range of possible max differences. The min possible difference is `1` (if all elements can be placed consecutively), and the max is the initial largest gap in the sorted input array `A`
- **`check(mid, arr, k)` Function:** This function determines the feasibility of a given maximum difference `mid`. It determines if a given maximum difference, `mid`, is achievable by adding _at most_ `k` new points:
  - Iterate through the sorted array `arr`
  - For each adjacent pair, calculate the difference `d`
  - If `d > mid`, we need to insert points. The `ceil` division: `(d + mid - 1) / mid` gives us the total number of segments of length at most `mid` required to cover the distance `d`. We know that `n+1` segments are created by `n` points, so number of points required is `((d + mid - 1) / mid) - 1`
  - Accumulate the total number of inserted points across all gaps
  - Return `true` if the total number of inserted points is less than or equal to `k` (feasible); otherwise, return `false`

**Time Complexity:** $O(N \log D)$, where $N$ is the number of elements in the input array and $D$ is the initial maximum difference (the range of our answer space). The `check` function takes $O(N)$ time, and binary search performs $O(\log D)$ iterations.
**Space Complexity:** $O(1)$

## Code

```cpp
bool check(ll mid, vector<ll> &arr, ll k) {
  ll prev = arr[0];
  int n = arr.size();
  ll count = 0;

  for (int i = 0; i < n; ++i) {
    ll d = arr[i] - prev;
    if (d > mid) {
      count += (d + mid - 1) / mid - 1;
    }
    prev = arr[i];
  }
  return count <= k;
}

void solve() {
  int n;
  ll k;
  cin >> n >> k;
  vector<ll> arr(n);
  ll lo = 1;
  ll hi = 0;
  ll prev = 0;
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
    if (i > 0)
      hi = max(hi, arr[i] - prev);
    prev = arr[i];
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

- [[6 Problems/minimize max dist to gas station\|minimize max dist to gas station]]
- [[6 Problems/points on line\|points on line]]
