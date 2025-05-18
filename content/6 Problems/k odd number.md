---
{"publish":true,"created":"2025-04-06T20:46:47.827+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[c++ STL\|c++ STL]]
> - [[2 Zettels/sliding window with variable window size\|sliding window with variable window size]]

Given an array of N integers, find a subarray with at most K odd numbers and the total sum is maximum but not more than D. If no such subarray exists print "IMPOSSIBLE". Note that the array can contain -ve numbers as well.

## Idea

This problem combines [[2 Zettels/sliding window with variable window size (snake framework)\|sliding window with variable window size (snake framework)]] with `multiset` STL. The key challenges are:

1. Maintaining window validity (<= K odd numbers)
2. Finding maximum subarray sum <= D within valid windows

> [!Warning]
> If a subarray from index L to R has number of distinct odd elements at most K, then all subarrays from index X to R (L < X) will also have number of distinct odd elements at most K. Note that the sum of the subarray won't follow a similar rule since negative elements are also present in the array.

To efficiently calculate subarray sums, we use [[2 Zettels/prefix sums\|prefix sums]]. Window: `[tail...head]`. Find largest X in `[tail...head]` where `prefs[X] - prefs[tail] <= D => prefs[X] <= prefs[tail] + D`. If we use `multiset` to maintain sorted prefix sums of valid windows, then we can find largest prefix sum <= (`prefs[tail] + D`) using `upper_bound()`.

**Time Complexity:** $O(n \log n)$ due to sliding window and `multiset`ops (takes $O(\log n)$)
**Space Complexity:** $O(n)$ due to prefix array and `multiset` storage

## Code

```cpp
bool check(int val, int odd_count, int k) {
  return odd_count + (abs(val) % 2 == 1) <= k;
}

void solve() {
  int n, k;
  ll d;
  cin >> n >> k >> d;
  vector<int> arr(n);
  vector<int> prefs(n + 1);
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
    prefs[i + 1] = prefs[i] + arr[i];
  }

  ll ans = LONG_MIN;
  int tail = 0, head = -1;
  ll odd_count = 0;
  multiset<ll> seen;

  while (tail < n) {
    while (head < n - 1 and check(arr[head + 1], odd_count, k)) {
      head++;
      odd_count += (abs(arr[head]) % 2 == 1);
      seen.insert(prefs[head + 1]);
    }

    if (head - tail + 1 != 0){
        // for current tail, find the "valid" index
      ll val = d + prefs[tail];
      auto it = seen.upper_bound(val);
      if (it != seen.begin()) {
        it--;
        ll rpref = *it;
        ans = max(ans, rpref - prefs[tail]);
      }
    }

    // if window is valid
    if (tail <= head) {
      // undo effect of tail
      odd_count -= (abs(arr[tail]) % 2 == 1);
      seen.erase(seen.find(prefs[tail + 1]));
    }

    tail++;
    head = max(head, tail - 1);
  }

  if (ans == LONG_MIN)
    cout << "IMPOSSIBLE" << endl;
  else
    cout << ans << endl;
}
```

One might wonder why we can't simply expand the window with both conditions directly, like:

```cpp
while (head < n - 1 && check(arr[head + 1], odd_count, k) && (prefs[head + 2] - prefs[tail] <= d)) {
    head++;
    odd_count += (abs(arr[head]) % 2 == 1);
}
```

The reason is that this approach would be suboptimal for this specific problem. When we expand the window until sum > d, you only find the longest valid subarray starting at each tail. However, shorter subarrays within that window might have _larger sums_ (while still being <= d), since we are also dealing with -ve numbers.

## Related
