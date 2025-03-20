---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-03-10T12:55:22.551+05:30"}
---


> [!Topics]
> - [[binary search\|binary search]]

Given a bitonic array (consists of increasing sequence followed by a decreasing sequence) A consisting of N integers and an integer Q. In each query, you will be given an integer K, find the positions of K in A.

Example:
```
Arr: 1 2 5 3 2 1
Search 3: 4
Search 1: 1 6 
```

The idea is straightforward. First we find [[6 Problems/peak index in mountain array\|peak index in mountain array]], by using the [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]] (the peak and everything to its right will always be greater than the next element)

```cpp
int find_peak(vector<int> &arr) {
  int lo = 0;
  int hi = arr.size() - 1;
  int ans = hi;

  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if ((mid == arr.size() - 1) or arr[mid] > arr[mid + 1]) {
      ans = mid;
      hi = mid - 1;
    } else
      lo = mid + 1;
  }

  return ans;
}

int find_in_subarray(vector<int> &arr, int lo, int hi, int x,
                     bool reverse = false) {
  if (lo >= int(arr.size()) or hi < 0)
    return -1;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] == x)
      return mid;
    else if (arr[mid] < x) {
      if (reverse)
        hi = mid - 1;
      else
        lo = mid + 1;
    } else {
      if (reverse)
        lo = mid + 1;
      else
        hi = mid - 1;
    }
  }
  return -1;
}

void solve() {
  int n, q;
  cin >> n >> q;
  vector<int> arr(n);
  for (int i = 0; i < n; ++i)
    cin >> arr[i];

  int peak = find_peak(arr);
  int x;
  while (q--) {
    cin >> x;
    int ansleft = find_in_subarray(arr, 0, peak, x);
    int ansright = find_in_subarray(arr, peak + 1, n - 1, x, true);
    if (ansleft != -1)
      cout << ansleft + 1;
    if (ansright != -1)
      cout << (ansleft == -1 ? "" : " ") << ansright + 1;
    cout << endl;
  }
}
```


## Related
