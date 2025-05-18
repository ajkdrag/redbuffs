---
{"publish":true,"created":"2025-04-04T14:01:23.777+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/sliding window with variable window size\|sliding window with variable window size]]

Given an array of N integers, find the length of the smallest sub-array that contains all the distinct elements of the array.

## Idea

Straightforward application of the [[2 Zettels/sliding window with variable window size (snake framework)\|sliding window with variable window size (snake framework)]]. Our state is maintained using [[2 Zettels/frequency array\|frequency array]]. For each start position (`tail`), the `head` moves forward, expanding the window, as long as the window does not contain all the distinct elements of the array. Once the window contains all distinct elements, we record the window length, we process `ans` as the snake length and step the tail forward, updating the freq table as we go.

**Time Complexity:** $O(n)$ - each element is visited at most twice (`head` and `tail`). 
**Space Complexity:** $O(\text{max\_range})$ (freq array of size $\text{max\_range}\approx10^5$)

## Code

```cpp
const int MAX_RANGE = 1e5 + 5;
vector<int> freq(MAX_RANGE);

bool check(int &count, int &n_uniques) {
  if (count == n_uniques)
    return false;
  return true;
}

void update(int val, int &count) {
  freq[val]++;
  if (freq[val] == 1)
    count++;
}

void undo_update(int val, int &count) {
  freq[val]--;
  if (freq[val] == 0)
    count--;
}

void solve() {
  int n;
  cin >> n;
  vector<int> arr(n);
  set<int> uniques;

  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
    uniques.insert(arr[i]);
  }

  int n_uniques = uniques.size();

  int count = 0;
  int tail = 0, head = -1;
  int ans = n;

  while (tail < n) {
    while (head < n - 1 and check(count, n_uniques)) {
      head++;
      update(arr[head], count);
    }

    if (count == n_uniques)
      ans = min(ans, head - tail + 1);

    if (tail <= head) {
      undo_update(arr[tail], count);
    }

    tail++;
    head = max(head, tail - 1);
  }

  cout << ans << endl;
}
```

## Related
