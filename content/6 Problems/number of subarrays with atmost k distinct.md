---
{"publish":true,"tags":["type/problem"],"platform":"AlgoZenith","link":null,"PassFrontmatter":true,"created":"2025-04-02T21:22:17.635+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/sliding window with variable window size\|sliding window with variable window size]]

Given an array of N integers, find the number of subarrays with at most K distinct elements.

## Idea

Straightforward application of [[2 Zettels/sliding window with variable window size (snake framework)\|sliding window with variable window size (snake framework)]]. The state is managed using [[2 Zettels/frequency arrays\|frequency arrays]].

**Time Complexity:** $O(n)$
**Space Complexity:** $O(\max(A))$ due to the frequency array

## Code

```cpp
bool check(vector<int> &freq, int count, int val, int k) {
  if (freq[val] == 0) {
    return count + 1 <= k;
  }
  return true;
}

void update_state(vector<int> &freq, int &count, int val) {
  if (freq[val] == 0)
    count++;
  freq[val]++;
}

void undo_update_state(vector<int> &freq, int &count, int val) {
  if (freq[val] == 1)
    count--;
  freq[val]--;
}

void solve() {
  int n, k;
  cin >> n >> k;
  vector<int> arr(n);

  int max_el = 0;
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
    max_el = max(max_el, arr[i]);
  }

  int head = -1, tail = 0;
  int count = 0;
  ll ans = 0;

  vector<int> freq(max_el + 1, 0);

  while (tail < n) {
    while (head < n - 1 and check(freq, count, arr[head + 1], k)) {
      head++;
      update_state(freq, count, arr[head]);
    }

    ans += (head - tail + 1);
    if (tail <= head) {
      undo_update_state(freq, count, arr[tail]);
    }

    tail++;
    head = max(head, tail - 1);
  }

  cout << ans << endl;
}
```

## Related
