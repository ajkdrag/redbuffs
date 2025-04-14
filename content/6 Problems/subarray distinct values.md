---
{"publish":true,"tags":["type/problem"],"platform":"CSES","link":"https://cses.fi/problemset/task/2428","PassFrontmatter":true,"created":"2025-04-07T16:58:50.892+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/sliding window with variable window size\|sliding window with variable window size]]

Given an array of $n$ integers, your task is to calculate the number of subarrays that have at most $k$ distinct values.

## Idea

This problem is a classic application of the [[2 Zettels/sliding window with variable window size (snake framework)\|sliding window with variable window size (snake framework)]] technique. The key insight is that we can efficiently count valid subarrays by maintaining a window where the number of distinct elements never exceeds `k`.

This problem can be efficiently solved using the sliding window technique with variable window size. The approach maintains two pointers (`tail` and `head`) that define the current window boundaries. We expand the window by moving `head` rightwards as long as the number of distinct elements remains ≤ `k`. When we can't expand further, all subarrays starting at `tail` and ending at any position up to `head` are valid, which we count in bulk using `(head - tail + 1)`. Then we move `tail` rightwards, adjusting our frequency counts accordingly. Basically, each expansion phase finds the maximum valid window for the current `tail` position.

The works because the window property (<= k distinct elements) satisfies the [[2 Zettels/sliding window with variable window size (snake framework)#Applicability Condition\|applicability condition]] - shrinking from the left can't make a valid window invalid.

**Time Complexity:** $O(n)$
**Space Complexity:** $O(1)$ extra space

## Code

```cpp
void solve() {
  int n, k;
  cin >> n >> k;
  vector<int> arr(n);
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
  }

  ll ans = 0;
  int tail = 0, head = -1;
  map<int, int> freq;
  int d_count = 0;

  while (tail < n) {
    // Expand until we have more than k distinct elements
    while (head + 1 < n) {
      // Check if adding the next element would exceed k distinct elements
      if (freq[arr[head + 1]] == 0 && d_count == k)
        break;

      // Safe to add next element
      head++;
      if (freq[arr[head]] == 0)
        d_count++;
      freq[arr[head]]++;
    }

    // Process window: all valid subarrays ending at positions [tail...head]
    // For each valid window [tail...head], we have (head-tail+1) valid
    // subarrays
    ans += (head - tail + 1);

    // undo effect of tail
    if (tail <= head) {
      freq[arr[tail]]--;
      if (freq[arr[tail]] == 0)
        d_count--;
    }

    tail++;
    head = max(head, tail - 1);
  }

  cout << ans << endl;
}
```

## Related
