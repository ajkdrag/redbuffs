---
{"publish":true,"tags":["type/problem"],"platform":"AtCoder","link":"https://atcoder.jp/contests/abc130/tasks/abc130_d","PassFrontmatter":true,"created":"2025-04-07T10:56:09.460+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/sliding window with variable window size\|sliding window with variable window size]]

Find the number of contiguous subarrays that sum up to at least $K$ given a sequence of integers $A$ of length $N$, where each element $a_i$ is between $1$ and $10^5$, and $1 \leq N, K \leq 10^5$.

## Idea

We use a sliding window where:

1. `head` tries to expand right until window sum >= K (maintain window sum just below K)
2. All subarrays starting at `tail` and ending >= `head` are valid (count = N - head - 1)
3. `tail` moves right to explore new starting positions

**Time Complexity:** $O(n)$
**Space Complexity:** $O(1)$

## Code

```cpp
bool check(ll x, ll sum, ll k) { return sum + x < k; }

void solve() {
  int n;
  ll k;
  cin >> n >> k;

  vector<ll> arr(n);
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
  }

  ll sum = 0;

  int tail = 0, head = -1;
  ll ans = 0;
  while (tail < n) {
    while (head < n - 1 and check(arr[head + 1], sum, k)) {
      head++;
      sum += arr[head];
    }

    // process window
    // [head+1 ...] contains all valid subarrays starting at tail
    ans += (n - 1 - head);

    if (tail <= head) {
      sum -= arr[tail];
    }

    tail++;
    head = max(head, tail - 1);
  }

  cout << ans << endl;
}
```

## Related

```

```
