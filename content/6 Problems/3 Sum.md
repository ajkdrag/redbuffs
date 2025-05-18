---
{"publish":true,"created":"2025-01-31T10:52:11.702+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/two pointers + sorting\|two pointers + sorting]]

## Idea

Straightforward 3Sum. Since problem asks to find the indices and array isn't alrady sorted. We store (val, index) pairs in a vector and sort it. After that, in a loop, fix a element and run 2Sum on the subarray after it. Return the indices accordingly.

## Code

```cpp
pii two_sum(vector<pair<ll, int>> arr, int l, ll x) {
  pii ans = {-1, -1};
  int r = arr.size() - 1;

  while (l < r) {
    if (arr[l].first + arr[r].first == x) {
      ans = {arr[l].second, arr[r].second};
      break;
    } else if (arr[l].first + arr[r].first < x) {
      l++;
    } else {
      r--;
    }
  }

  return ans;
}

void solve() {
  int n;
  ll t;
  cin >> n >> t;
  vector<pair<ll, int>> arr(n);

  ll temp;
  for (int i = 0; i < n; ++i) {
    cin >> temp;
    arr[i] = {temp, i + 1};
  }

  sort(all(arr));

  pair<ll, int> a;
  for (int i = 0; i < n; ++i) {
    a = arr[i];
    pii found = two_sum(arr, i + 1, t - a.first);
    if (found.first != -1) {
      cout << a.second << " " << found.first << " " << found.second << "\n";
      return;
    }
  }
  cout << "IMPOSSIBLE\n";
}
```

## Related

- [[6 Problems/3 Sum variation\|3 Sum variation]]
