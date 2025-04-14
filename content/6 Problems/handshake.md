---
{"publish":true,"tags":["type/problem"],"platform":"AtCoder","link":"https://atcoder.jp/contests/abc149/tasks/abc149_e","PassFrontmatter":true,"created":"2025-03-30T14:22:06.319+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]

There are $N$ guests with varying power levels. Each guest $i$ has a power value $A[i]$. We want to perform exactly $M$ handshakes, where each handshake between guests with powers $x$ and $y$ contributes $(x + y)$ to the total power. The same pair of guests cannot shake hands more than once. Find the maximum possible total power that can be achieved.

## Idea

### Approach: Binary Search with Prefix Sums

A crucial observation is that to maximize the total power, we should prioritize handshakes between guests with higher power levels. This suggests sorting the guest power levels. Once sorted, we can efficiently determine pairs whose sum is above a certain threshold.

We can use binary search to find the smallest sum `T` such that there are _at least_ `M` pairs with a sum `>= T`. To efficiently count the number of pairs with a sum at least `T`, we can iterate through each guest `arr[i]` and use `lower_bound` on the sorted array to find the number of guests `arr[j]` such that `arr[i] + arr[j] >= T` (similar to the step we do in [[6 Problems/multiplication table\|multiplication table]] problem).

After finding the optimal threshold `T` using binary search, we need to calculate the sum of the top `M` pairs. We iterate through the sorted array again. For each guest `arr[i]`, we find the number of suitable partners using `lower_bound` and add their contribution to the total sum. We can use [[2 Zettels/prefix sums\|prefix sums]] to efficiently calculate the sum of powers of the suitable partners.

> [!Important] Adjustment for Overcounting
> The binary search finds the smallest threshold `T` such that there are _at least_ `M` pairs with sum `>= T`. Let `C` be the count of pairs with sum `>= T`, i.e. `C = count(sum >= T)`.
>
> Since `T` is the _smallest_ sum guaranteed to yield at least `M` pairs, any sum _larger_ than `T` (i.e., `T+1`) must have _fewer_ than `M` pairs. Therefore, the pairs making the difference between `count(sum >= T)` and `count(sum >= T+1)` must have a sum of _exactly_ `T`.
>
> If `C > M`, our initial sum calculation includes `C` pairs, which is `C - M` too many. Since these extra `C - M` pairs are the ones with the lowest qualifying sum, they must have a sum _exactly_ equal to `T`.
>
> Therefore, the initial sum is overestimated by `(C - M) * T`. We must subtract this value to get the sum for exactly the top `M` pairs.

- **Time Complexity:** $O(N \log N)$ for sorting + $O(N \log N \cdot \log(\max A))$ for binary search
- **Space Complexity:**: $O(N)$ for prefix sums array

## Code

```cpp
ll get_count(ll min_sum, vector<int> &arr) {
  int n = arr.size();
  ll count = 0;
  for (int i = 0; i < n; ++i) {
    int curr = arr[i];
    ll need = min_sum - curr;
    auto it = lower_bound(all(arr), need);
    count += distance(it, arr.end());
  }

  return count;
}

bool check(ll min_sum, vector<int> &arr, ll m) {
  return get_count(min_sum, arr) >= m;
}

void solve() {
  int n;
  ll m;
  cin >> n >> m;
  vector<int> arr(n);
  vector<ll> prefs(n + 1);
  for (int i = 0; i < n; ++i)
    cin >> arr[i];

  sort(all(arr));

  for (int i = 0; i < n; ++i)
    prefs[i + 1] = prefs[i] + arr[i];

  ll lo = 2 * arr[0];
  ll hi = 2 * arr[n - 1] + 5;
  ll min_sum = lo;

  while (lo <= hi) {
    ll mid = lo + (hi - lo) / 2;
    if (check(mid, arr, m)) {
      min_sum = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  ll ans = 0;
  for (int i = 0; i < n; ++i) {
    int curr = arr[i];
    ll need = min_sum - curr;
    auto it = lower_bound(all(arr), need);
    int j = distance(it, arr.end());
    ans += (1LL * j * curr);
    ans += prefs[n] - prefs[n - j];
  }

  // account for overcounting
  ll extra = get_count(min_sum, arr) - m;
  ans -= extra * min_sum;
  cout << ans << endl;
}
```

## Related
