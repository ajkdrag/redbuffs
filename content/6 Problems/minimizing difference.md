---
{"publish":true,"created":"2025-03-28T12:59:08.805+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[2 Zettels/prefix sums\|prefix sums]]
> - [[2 Zettels/greedy algorithm\|greedy algorithm]]

Given an array `a` of `n` integers and a budget `k`. You can perform an operation at most `k` times: choose an element and increase or decrease it by 1. Find the minimum possible difference between the maximum and minimum elements in the final array.

## Idea

The core idea is to use **binary search on the answer**, the minimum possible difference `d`. If it's possible to achieve a difference `d` within `k` operations, it's also possible to achieve any difference `d' > d` (potentially with fewer operations). This monotonic property allows us to binary search for the smallest feasible `d`.

### Approach 1 (Prefix sums + Binary Search)

For a given difference `d`, we need to determine if it's possible to make the final difference between the maximum and minimum elements at most `d` using `<= k` operations. Sorting the array `a` makes it easier to calculate costs. Also, precomputing the prefix sums `pref` of the sorted array allows us to calculate the sum of elements in a range `[i, j]` in $O(1)$ time as `pref[j+1] - pref[i]`.

To achieve a difference `d`, we need to find a target range `[min_val, max_val]` such that `max_val - min_val <= d`. The total cost involves increasing elements smaller than `min_val` to `min_val` and decreasing elements larger than `max_val` to `max_val`, i.e.,

$$
\text{cost} = \sum_{a_j < \text{min\_val}} (\text{min\_val} - a_j) + \sum_{a_k > \text{max\_val}} (a_k - \text{max\_val})
$$

> [!Tip] Key Insight
> In an optimal final configuration, either the minimum value (`min_val`) or the maximum value (`max_val`) corresponds to one of the original values in the sorted array `a[i]`.

Thus, we can iterate through each `a[i]` in the sorted array and:

- **Case 1: Assume `min_val = a[i]`.** The target range is `[a[i], a[i] + d]`.
    - Calculate cost to increase elements `a[0...i-1]` to `a[i]`: `cost_inc = i * a[i] - pref[i]`.
    - Calculate cost to decrease elements `a[q...n-1]` to `a[i] + d`, where `a[q]` is the first element `> a[i] + d`. Find `q` using `upper_bound`. `cost_dec = (pref[n] - pref[q]) - (n - q) * (a[i] + d)`.
    - If `cost_inc + cost_dec <= k`, then difference `d` is possible. Return `true`.
- **Case 2: Assume `max_val = a[i]`.** The target range is `[a[i] - d, a[i]]`.
    - Calculate cost to increase elements `a[0...p-1]` to `a[i] - d`, where `a[p]` is the first element `>= a[i] - d`. Find `p` using `lower_bound`. `cost_inc = p * (a[i] - d) - pref[p]`.
    - Calculate cost to decrease elements `a[q...n-1]` to `a[i]`, where `a[q]` is the first element `> a[i]`. Find `q` using `upper_bound`. `cost_dec = (pref[n] - pref[q]) - (n - q) * a[i]`.
    - If `cost_inc + cost_dec <= k`, then difference `d` is possible. Return `true`.
- If the loop completes without finding a suitable range, return `false`.

**Time Complexity:** $O(n \log n \cdot \log \text{D})$ where $D$ is range of binary search which's $\approx 10^9$ for given problem.
**Space Complexity:** $O(n)$ due to prefix sum array

### Approach 2: Two Pointers

This approach leverages [[2 Zettels/two pointers at opposite ends\|two pointers at opposite ends]] technique. The key steps:

1. Sort the array
2. Use two pointers (`i=0`, `j=n-1`) converging toward the median. This is a greedy approach
3. For each pair `(v[i], v[j])`, the optimal cost to make their difference <= `d` is `max(0, (v[j] - v[i]) - d)`
4. Sum these costs for all pairs: if total <= `k`, `d` is feasible

Example:

```
Original array: [1, 3, 5, 7, 9]
Pairs: (1,9), (3,7), (5)
Target d=3:
- (1,9) needs 9-1-3 = 5 ops
- (3,7) needs 7-3-3 = 1 op
- Total: 6 ops
```

> [!Question] Why it works?
> Fixing pairs in desc order of their differences, gives maximal reduction in total operations

**Time Complexity**: $O(n \log n)$ (sorting) + $O(n \log D)$ (binary search with linear check)
**Space Complexity**: $O(1)$ (no extra space beyond input)

## Code

```cpp
// Approach 1 (Binary Search)
ll calculate_cost_inc(ll target_min, const vector<int> &arr,
                      const vector<ll> &pref) {
  // Find index p such that arr[p] >= target_min (first element not less than
  // target_min)
  auto it = lower_bound(all(arr), target_min);
  int p = distance(arr.begin(), it);
  // Sum for arr[0]...arr[p-1]
  return p * target_min - pref[p];
}

ll calculate_cost_dec(ll target_max, const vector<int> &arr,
                      const vector<ll> &pref) {
  // Find index q such that arr[q] > target_max (first element greater than
  // target_max)
  int n = arr.size();
  auto it = upper_bound(all(arr), target_max);
  int q = distance(arr.begin(), it);
  // Sum for arr[q]...arr[n-1]
  return (pref[n] - pref[q]) - (n - q) * target_max;
}

bool check(ll mid, vector<int> &arr, vector<ll> &pref, ll k) {
  int n = arr.size();
  if (n == 0)
    return true; // Edge case: empty array

  for (int i = 0; i < n; ++i) {
    // Case 1: Test range [arr[i], arr[i] + mid]
    ll cost1 = calculate_cost_inc(arr[i], arr, pref) +
               calculate_cost_dec(arr[i] + mid, arr, pref);
    if (cost1 <= k) {
      return true;
    }

    // Case 2: Test range [arr[i] - mid, arr[i]]
    ll cost2 = calculate_cost_inc(arr[i] - mid, arr, pref) +
               calculate_cost_dec(arr[i], arr, pref);
    if (cost2 <= k) {
      return true;
    }
  }
  return false;
}

void solve() {
  int n;
  ll k;
  cin >> n >> k;
  vector<int> arr(n);
  vector<ll> pref(n + 1, 0);

  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
  }
  sort(all(arr));

  for (int i = 0; i < n; ++i) {
    pref[i + 1] = arr[i] + pref[i];
  }
  ll lo = 0;
  ll hi = 1e9 + 5;
  ll ans = hi;

  while (lo <= hi) {
    ll mid = lo + (hi - lo) / 2;
    if (check(mid, arr, pref, k)) {
      ans = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  cout << ans << endl;
}


// Approach 2 (Two pointers)
void solve() {
  ll n, k;
  cin >> n >> k;
  vector<ll> v(n);
  ll ans = 0, lo = 0, hi = -1;
  for (auto &e : v) {
    cin >> e;
    hi = max(hi, e);
  }
  sort(all(v));
  auto check = [&](ll mid) -> bool {
    ll diff_to_make = 0;
    for (ll i = 0; i < n / 2; i++) {
      ll curr_diff = v[n - i - 1] - v[i];
      diff_to_make += max(0ll, curr_diff - mid);
    }
    return diff_to_make <= k;
  };
  while (lo <= hi) {
    ll mid = lo + (hi - lo) / 2;
    if (check(mid)) {
      ans = mid;
      hi = mid - 1;
    } else
      lo = mid + 1;
  }
  cout << ans << endl;
}
```

## Related

- [[6 Problems/minimise max diff\|minimise max diff]]
- [[6 Problems/distinct numbers\|distinct numbers]]

```

```
