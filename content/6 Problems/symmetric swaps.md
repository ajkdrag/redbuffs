---
{"publish":true,"tags":["type/problem"],"platform":"Codechef","link":"https://www.codechef.com/practice/course/5-star-and-above-problems/DIFF2500/problems/SYMARRSWAP?tab=statement","PassFrontmatter":true,"created":"2025-04-07T14:37:42.145+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/sliding window with variable window size\|sliding window with variable window size]]

Given two arrays $A$ and $B$ of the same size $N$, find the minimum possible value of $(A_{max} - A_{min})$ after performing any number of swap operations between corresponding elements of $A$ and $B$.

## Idea

This problem can be solved using a **sliding window approach on sorted data**, specifically the [[2 Zettels/sliding window with variable window size (snake framework)\|sliding window with variable window size (snake framework)]]:

1. Merge both arrays while tagging each element with its original index (0 to n-1)
2. Sort all elements while preserving their tags
3. **Sliding Window**:
   - Goal: Find the smallest window containing at least one element from each original index
   - Use frequency array to track which indices are covered
   - Expand window (`head++`) until all indices are covered
   - Track minimum difference between window ends

Key insight: After sorting, the optimal solution will be a contiguous window in the sorted array.
**Time Complexity:** $O(n \log n)$ (sorting) + $O(n)$ (2 pointers)
**Space Complexity:** $O(n)$ (combined arr)

## Code

```cpp
void solve() {
  int n;
  cin >> n;
  vector<pii> arr(2 * n);

  int x;
  for (int i = 0; i < 2 * n; ++i) {
    cin >> x;
    arr[i] = {x, i % n};
  }

  if (n == 1) {
    cout << 0 << endl;
    return;
  }

  sort(all(arr));

  int ans = INT_MAX;
  int tail = 0, head = -1;

  int d_count = 0;
  vector<int> freq(n, 0);

  while (tail < 2 * n) {
    while (head < 2 * n - 1 and d_count < n) {
      head++;
      d_count += (freq[arr[head].second] == 0);
      freq[arr[head].second]++;
    }

    if (d_count == n) {
      ans = min(ans, arr[head].first - arr[tail].first);
    }

    if (tail <= head) {
      d_count -= (freq[arr[tail].second] == 1);
      freq[arr[tail].second]--;
    }

    tail++;
    head = max(head, tail - 1);
  }

  cout << ans << endl;
}
```

## Related
