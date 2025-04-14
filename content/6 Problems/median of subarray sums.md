---
{"publish":true,"tags":["type/problem"],"platform":"AlgoZenith","link":null,"PassFrontmatter":true,"created":"2025-04-06T11:29:46.719+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[sliding window\|sliding window]]

Given an array of N integers A. The score of a subarray is the **sum of all integers** in the subarray. Mr.X calculated the score of all subarrays. Mr.X wants you to find the median of the array containing the score of all the subarray.

## Idea

To find the median of all subarray sums efficiently, we combine:

1. [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]] (to search for the median value)
2. [[2 Zettels/sliding window with variable window size (snake framework)\|sliding window with variable window size (snake framework)]] (to count subarrays with sum <= mid)

Key steps:

1. **Binary Search Setup**

   - Search space: `[min_element, total_sum_of_array]`
   - For each `mid`, count how many subarrays have sum <= `mid` (sliding window)
   - Median is the smallest value where count >= `(n*(n+1)/2 + 1)//2` (middle index)

2. **Sliding Window Count**
   - Use snake pattern to count valid subarrays in $O(n)$:
   - Window maintains sum <= `mid` while expanding `head`
   - For each valid `[tail...head]`, all subarrays `[tail...i]` where `i <= head` are valid (add `head-tail+1` to count)

**Time Complexity:**

1. Binary search runs in $O(\log(\text{total\_sum}))$ iterations
2. Each sliding window count operation takes $O(n)$ time
3. Total: $O(n \log(\text{total\_sum}))$ (typically $\text{total\_sum}\le 10^{14}$)
   **Space Complexity:** $O(1)$ extra space

## Code

```cpp
bool check(ll mid, vector<ll> &arr, ll k) {
  ll num_subarrays = 0;
  int n = arr.size();

  ll sum = 0;
  int tail = 0, head = -1;
  while (tail < n) {
    while (head < n - 1 and (sum + arr[head + 1] <= mid)) {
      head++;
      sum += arr[head];
    }

    num_subarrays += head - tail + 1;
    if (tail <= head) {
      sum -= arr[tail];
    }

    tail++;
    head = max(head, tail - 1);
  }

  return num_subarrays >= k;
}

void solve() {
  int n;
  cin >> n;
  vector<ll> arr(n);
  ll lo = INT_MAX;
  ll hi = 0;
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
    hi += arr[i];
    lo = min(lo, arr[i]);
  }

  ll total_subarrays = (1LL * n * (n + 1)) / 2;
  ll ans = hi;
  while (lo <= hi) {
    ll mid = lo + (hi - lo) / 2;
    if (check(mid, arr, (total_subarrays + 1) / 2)) {
      ans = mid;
      hi = mid - 1;
    } else
      lo = mid + 1;
  }

  cout << ans << endl;
}
```

## Related

- [[6 Problems/median of the uniqueness array\|median of the uniqueness array]]
