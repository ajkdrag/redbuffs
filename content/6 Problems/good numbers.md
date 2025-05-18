---
{"publish":true,"created":"2025-02-18T10:37:45.519+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/difference arrays\|difference arrays]]
> - [[2 Zettels/prefix sums\|prefix sums]]

We are given $N$ students, and each student $i$ likes a range of numbers $[l_i, r_i]$. A number is considered "good" if it is liked by at least $K$ students. We need to answer $Q$ queries, where each query asks for the count of good numbers within a given range $[L, R]$.

## Idea

This problem can be efficiently solved using the **difference array** technique combined with **prefix sums**. The core idea is to determine, for each number, how many students like it, and then count how many of these numbers are liked by at least $K$ students within the query ranges. Thus, we do [[range updates\|range updates]] and later do [[range queries\|range queries]].

### Approach

Instead of directly counting likes for each number, we use a difference array. After processing all student preferences in the difference array (point updates: +1 and -1), we calculate the prefix sum of this array. With this, for each index i, we now have the _actual number of students who like the number_ i.

Now we need to find the "good" numbers, i.e., numbers liked by at least K students. We create another binary array (0 if num isn't "good" else 1). Taking a prefix sum of this array allows us to answer range queries in constant time.

**Time Complexity:**

- Processing student likes: $O(N)$
- Prefix sum calculations (on diff array as well as binary array): $O(MAX)$
- Query processing:\*\* $O(Q)$
- Total: $O(N + MAX + Q)$

## Code

```cpp
void solve() {
  int n, k, q;
  cin >> n >> k >> q;

  int MAX = 1000001;
  vector<ll> arr(MAX, 0);
  vector<ll> res(MAX, 0);

  int l, r;
  for (int i = 1; i <= n; ++i) {
    cin >> l >> r;
    // "difference array" point updates
    arr[l] += 1;
    arr[r + 1] += -1;
  }

  for (int i = 1; i < MAX; ++i) {
    arr[i] += arr[i - 1];
  }

  for (int i = 1; i < MAX; ++i) {
    // (arr[i] >= k) gives our binary array and we do prefix sum in same step
    res[i] = (arr[i] >= k) + res[i - 1];
  }

  while (q--) {
    cin >> l >> r;
    cout << res[r] - res[l - 1] << "\n";
  }
}

```

## Related
