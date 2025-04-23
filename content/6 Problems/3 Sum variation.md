---
{"publish":true,"tags":["type/problem"],"platform":"AlgoZenith","link":null,"PassFrontmatter":true,"created":"2025-04-06T10:54:50.782+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/two pointers technique\|two pointers technique]]

Given an array A of N integers and an integer _target_, find three integers in A such that the sum is closest to the target, i.e. (`abs(sum - target)` is minimum). Print the minimum absolute value of `(sum - target)`. All three indexes should be distinct.

## Idea

- **Sort first**
- **Fix one element**: For each `arr[i]`, apply [[2 Zettels/two pointers at opposite ends\|two pointers at opposite ends]] technique on remaining elements
- **Adjust pointers**:
    - If sum < target → move left pointer right (for larger values)
    - If sum > target → move right pointer left (for smaller values)
    - If sum == target → answer is 0 (optimal)
- Track minimal `abs(sum - target)` at each step

**Time Complexity:** $O(n\log n)$ (sorting) + $O(n^2)$ (2 pointers)
**Space Complexity:** $O(1)$

## Code

```cpp
void solve() {
  int n;
  ll t;
  cin >> n >> t;
  vector<ll> arr(n);
  for (int i = 0; i < n; ++i)
    cin >> arr[i];

  sort(all(arr));

  ll ans = abs(t - arr[0] - arr[1] - arr[2]);
  for (int i = 0; i <= n - 3; ++i) {
    ll a = arr[i];
    int l = i + 1;
    int r = n - 1;

    while (l < r) {
      ll b = arr[l];
      ll c = arr[r];
      ll sum = a + b + c;
      // check for min at each step
      ans = min(ans, abs(t - sum));

      if (sum < t) {
        l++;
      } else if (sum > t) {
        r--;
      } else {
        break;
      }
    }
  }

  cout << ans << endl;
}
```

## Related
