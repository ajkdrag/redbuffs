---
{"publish":true,"tags":["type/problem"],"platform":"Codeforces","link":"https://codeforces.com/contest/279/problem/B","PassFrontmatter":true,"created":"2025-01-31T10:33:32.342+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/sliding window with variable window size\|sliding window with variable window size]]

## Idea

Straightforward application of sliding window: Given an array, find the longest subarray where the sum is less than or equal to K.

**Time Complexity:** $O(n)$
**Space Complexity:** $O(1)$

## Code

```cpp
void solve {
  int n, t;
  cin >> n >> t;

  vector<int> arr(n);
  int temp, left = 0, right = 0, runner = 0, best = 0;
  for (; right < n; ++right) {
    cin >> temp;
    arr[right] = temp;
    runner += temp;
    while (runner > t) {
      runner -= arr[left++];
    }
    best = max(best, right - left + 1);
  }
  cout << best << endl;
}
```

## Related
