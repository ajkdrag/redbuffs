---
{"publish":true,"created":"2025-04-02T21:09:01.461+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/sliding window with variable window size\|sliding window with variable window size]]

Given an array of N integers, find the number of subarrays with a sum less than equal to K.

## Idea

Straightforward application of [[2 Zettels/sliding window with variable window size (snake framework)\|sliding window with variable window size (snake framework)]]. For a start position, "consume" the elements until the sum is greater than K. Update the answer and move to next start position.

**Time Complexity:** $O(n)$
**Space Complexity:** $O(1)$

## Code

```cpp
void solve() {
  int n, k;
  cin >> n >> k;
  vector<int> arr(n);
  for (int i = 0; i < n; ++i)
    cin >> arr[i];

  int head = -1, tail = 0;
  int sum = 0;
  ll ans = 0;
  while (tail < n) {
    while (head < n - 1 and (sum + arr[head + 1]) <= k) {
      head++;
      sum += arr[head];
    }

    ans += (head - tail + 1);

    if (tail <= head) {
      sum -= arr[tail];
    }

    tail++;
    head = max(head, tail - 1);
  }

  cout << ans << endl;
}
```

## Related

- [[6 Problems/number of subarrays with atmost k distinct\|number of subarrays with atmost k distinct]]
