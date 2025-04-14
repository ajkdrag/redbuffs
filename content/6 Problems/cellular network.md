---
{"publish":true,"tags":["type/problem"],"platform":"Codeforces","link":"https://codeforces.com/problemset/problem/702/C","PassFrontmatter":true,"created":"2025-03-15T18:03:21.549+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[2 Zettels/greedy algorithms\|greedy algorithms]]

- You are given **n** cities at positions on a line
- You are given **m** towers at specified positions
- A tower covers any city that lies within distance **r**

**Goal:** Find the minimal **r** such that every city is covered by at least one tower.
**Variation:** You are allowed to pick atmost **k** towers out of **m** (in the original codeforces problem, we don't have this constraint, so you can assume **k=m** as we did in the code).

## Idea

We can binary search on the range of radius and for each candidate $r$, we need to check if we can cover all the $n$ cities by using atmost $k$ of the $m$ towers.

The feasibility check can be done efficiently using a sweep technique, since the cities and towers are already sorted in non-decreasing order.

Here's a **greedy algorithm**. For each city:

- see if it is already covered by the previous chosen tower
- if yes, continue, else, we need to pick a new tower
- for a city at position `x`, the tower must lie within the interval `[x - r, x + r]`
- use binary search on the remaining towers to find the furthest tower within `x + r`, i.e. we can use C++ `upper_bound` to find tower > `x+r` and then pick the tower before it
- it can happen that the tower obtained from previous step is far to the left and not within `x - r` (i.e., it doesn't actually cover the city). In this case, it's impossible to cover this city
- If at the end we run out of towers, then it's not feasible

Note that this algorithm gives us the minimum towers (among $m$), needed to cover all cities. If this value is $\le k$, then indeed the candidate $r$ is feasible.

**Time Complexity:** $O(\log D \times{n \log m})$ where $D$ is the max dist between a tower and city
**Space Complexity:** $O(n + m)$ for storing the arrays

## Code

```cpp
bool check(ll r, vector<ll> &A, vector<ll> &B, int num_allowed) {
  int i = 0, j = 0;
  int n = A.size(), m = B.size();

  ll prev_tower_range = INT_MIN;
  int count = 0;
  while (i < n && j < m) {
    ll city = A[i];
    // If the current city is already covered, move to the next city.
    if (city <= prev_tower_range) {
      i++;
      continue;
    } else {
      ll lo = city - r;
      ll hi = city + r;
      // find the first tower > 'hi'
      auto it = upper_bound(B.begin() + j, B.end(), hi);
      if (it == B.begin() + j)
        return 0; // No tower found within range
      ll candidate = *(--it); // we need tower <= hi, so subtract 1
      if (candidate < lo)
        return 0; // Tower is too far left; cannot cover city
      prev_tower_range = candidate + r;
      j = distance(it, B.begin());
      i++;
      count++;
      if(count > num_allowed) return 0; // Exceeded allowed towers.
    }
  }

  return (i == n and count <= num_allowed);
}

void solve() {
  int n, m, k;
  cin >> n >> m;
  k = m; // max number of towers we can choose (harder variation)

  vector<ll> A(n), B(m);

  for (int i = 0; i < n; ++i) {
    cin >> A[i];
  }

  for (int i = 0; i < m; ++i) {
    cin >> B[i];
  }

  ll lo = 0;
  ll hi = 2e9 + 5; // tower is at -1e9 and city is at 1e9
  ll ans = hi;

  while (lo <= hi) {
    ll mid = lo + (hi - lo) / 2;
    if (check(mid, A, B, k)) {
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
