---
{"publish":true,"tags":["type/problem"],"platform":"AlgoZenith","link":null,"PassFrontmatter":true,"created":"2025-04-04T10:40:09.946+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/sliding window with variable window size\|sliding window with variable window size]]
> - [[dynamic programming\|dynamic programming]]

## Idea

### Approach 1 (Sliding Window)

Straightforward application of the [[2 Zettels/sliding window with variable window size (snake framework)\|sliding window with variable window size (snake framework)]]. Our state is maintained using [[2 Zettels/frequency arrays\|frequency arrays]] (or hashmap in this case). For each start position (`tail`), the `head` moves forward, expanding the window, as long as the element at `arr[head + 1]` is not already present in the current window (tracked by `freq`). The longest valid window length is tracked in `ans`. Process `ans` as the snake length and step the tail forward, updating the freq table as we go.

**Time Complexity:** $O(n)$ - each element is visited at most twice (`head` and `tail`). Although a hashmap is used, in the worst case, each element will be inserted and deleted at most once, thus the amortized time complexity is still linear.
**Space Complexity:** $O(n)$ - in the worst case, the hashmap `freq` might contain all the distinct elements of the array.

### Approach 2 (DP)

For each element at index `i`, track the start of the longest window ending at `i` where all elements are distinct.

1. Use `last` map to store the most recent position of each element
2. `dp[i]` tracks the start index of the valid window ending at `i`
3. At each step: `dp[i] = max(dp[i-1], last[arr[i]] + 1)`
   1. If `arr[i]` wasn't seen before then `last[arr[i]]` is `-1`
4. Answer is `max(i - dp[i] + 1)`

## Code

```cpp
// Approach 1 (sliding window)
void solve() {
  int n;
  cin >> n;

  vector<int> arr(n);
  int ans = 0;
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
  }

  map<int, int> freq;
  int tail = 0, head = -1;

  while (tail < n) {
    while (head < n - 1 and freq.find(arr[head + 1]) == freq.end()) {
      head++;
      freq[arr[head]]++;
    }

    ans = max(ans, head - tail + 1);

    if (tail <= head) {
      freq[arr[tail]]--;
      if (freq[arr[tail]] == 0) {
        freq.erase(arr[tail]);
      }
    }

    tail++;
    head = max(head, tail - 1);
  }

  cout << ans << endl;
}

// Approach 2 (DP)
void solve_dp() {
  int n;
  cin >> n;
  vector<int> arr(n);
  for (int &x : arr)
    cin >> x;

  unordered_map<int, int> last;
  vector<int> dp(n);
  int ans = 0;

  for (int i = 0; i < n; ++i) {
    if (i == 0)
      dp[i] = 0;
    else
      dp[i] = max(dp[i - 1],
                  last.find(arr[i]) == last.end() ? -1 : last[arr[i]] + 1);

    ans = max(ans, i - dp[i] + 1);
    last[arr[i]] = i;
  }

  cout << ans << endl;
}
```

## Related

- https://cses.fi/problemset/task/1141/ (same problem)
