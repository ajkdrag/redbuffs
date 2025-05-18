---
{"publish":true,"created":"2025-04-05T10:03:19.454+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[interval coding pattern\|interval coding pattern]]

We are given a level represented as a line segment from point $0$ to point $n+1$, where $n$ is the length of the level, and there is a boss waiting at $n+1$. There are $m$ soldiers, each characterized by an agility value, and the level contains $k$ traps. Each trap is defined by its position $l_i$, the disarm point $r_i$, and a danger level $d_i$. A trap kills any soldier with agility less than $d_i$ when they step on the trap at $l_i$. However, traps can be disarmed instantly when you (the leader) reach the corresponding $r_i$. The objective is to choose the maximum number of soldiers such that they all can be safely escorted from point $0$ to point $n+1$ within $t$ seconds.

## Idea

The core idea is to perform a binary search on the minimum agility threshold required for the soldiers. For any given candidate threshold $\theta$, only traps with $d_i > \theta$ pose a threat. In the provided implementation, which is based on the [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]], the check function filters out the traps that are dangerous for soldiers with agility at least $\theta$, i.e., traps where $d_i > \theta$. The dangerous traps are then represented as intervals $\left[l_i, r_i\right]$.

Once these intervals are collected, they are sorted by their starting positions. We then [[merge overlapping intervals\|merge overlapping intervals]] to avoid counting extra time more than once. The reason is that if two traps' danger zones overlap, we can disarm them with one detour rather than two separate ones (this is a [[2 Zettels/greedy algorithm\|greedy step]]).

For each merged interval $[L, R]$, we must:

- walk from our current "safe" spot (which is at $L - 1$) to $R$ (to disarm the trap), and then back to $L-1$ (to rejoin the squad)
- this detour costs us: $2 \times (R - L + 1)$ seconds

The **base time** for the journey, which is moving from point $0$ to point $n+1$, is $n+1$ seconds. The total time is thus the sum of the base time and _all extra detour times_. If this total time is within the allowed $t$ seconds, then it is possible to escort all soldiers with agility at least $\theta$ safely. The binary search then finds the minimal feasible threshold, and the final answer is the count of soldiers with agility _at least_ this threshold (can be obtained using `lower_bound`).

## Code

```cpp
struct Trap {
  int l, r, d;
};

bool check(int n, int th, const vector<Trap> &traps, int t) {
  vector<pii> intervals;
  // filter out dangerous traps
  for (const Trap &trap : traps) {
    if (trap.d > th)
      intervals.pb({trap.l, trap.r});
  }

  sort(all(intervals));
  int prev_start = 0, prev_end = -1;
  int extra_time = 0;

  for (auto &interval : intervals) {
    if (interval.first > prev_end) {
      // no overlap with prev interval
      if (prev_end != -1) {
        extra_time += 2 * (prev_end - prev_start + 1);
      }
      prev_start = interval.first, prev_end = interval.second;
    } else {
      // overlaps with prev interval
      prev_end = max(prev_end, interval.second);
    }
  }

  // Add the last interval if exists
  if (prev_end != -1){
    extra_time += 2 * (prev_end - prev_start + 1);
  }

  return (n + 1 + extra_time) <= t;
}

void solve() {
  int m, n, k, t;
  cin >> m >> n >> k >> t;
  vector<int> soldiers(m);
  for (int i = 0; i < m; ++i)
    cin >> soldiers[i];
  sort(all(soldiers));

  vector<Trap> traps(k);
  int l, r, d;
  for (int i = 0; i < k; ++i) {
    cin >> l >> r >> d;
    traps[i] = Trap({l, r, d});
  }

  int lo = 1;
  int hi = 2e5 + 5;
  int ans = 0;

  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (check(n, mid, traps, t)) {
      ans = mid;
      hi = mid - 1;
    } else
      lo = mid + 1;
  }

  int count = soldiers.end() - lower_bound(all(soldiers), ans);
  cout << count << endl;
}
```

## Related
