---
{"publish":true,"created":"2025-03-22T13:25:17.244+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/two pointers technique\|two pointers technique]]
> - [[binary search\|binary search]]

Given two arrays $A$ and $B$, both of size $N$, find the number of "good pairs". A pair $(i, j)$ is considered "good" if $i < j$ and $A_i + A_j > B_i + B_j$.

## Idea

Using [[basic arithmetic\|basic arithmetic]], transform the condition $A_i + A_j > B_i + B_j$ to:

$$
(A_i - B_i) + (A_j - B_j) > 0
$$

Compute a new array `diff` where `diff[i] = A[i] - B[i]`. The problem now reduces to finding pairs $(i, j)$ such that `diff[i] + diff[j] > 0` and $i < j$.

We can solve above using [[2 Zettels/two pointers at opposite ends\|two pointers at opposite ends]] technique (sort `diff` first). Use two pointers, `l` and `r`, starting from the beginning and end of the sorted `diff` array, respectively. If `diff[l] + diff[r] > 0`, then all pairs `(l, r), (l+1, r), ..., (r-1, r)` are good pairs. Increment the `count` by `r - l` and decrement `r` (since we accounted for all pairs that end at `r`. This is akin to [[2 Zettels/contribution technique\|contribution technique]]). If `diff[l] + diff[r] <= 0`, then increment `l` to find a larger value that might satisfy the condition.

**Time Complexity:** $O(N + N \log N + N)$ for `diff` array, sorting and 2 pointers respectively.
**Space Complexity:** $O(N)$ for `diff` array

### Alternative approach

**Binary Search (Less Efficient):** For each element `diff[i]`, you could use binary search to find the number of elements `diff[j]` such that `diff[j] > -diff[i]` and $j > i$.

```cpp
ll pairs_with_sum_larger_than_0(const vector<int> &arr) {
  int n = arr.size();
  ll count = 0;

  for (int i = 0; i < n; ++i) {
    // Find the number of elements greater than -arr[i] in the subarray
    // arr[i+1...n-1] Use upper_bound to find the first element > -arr[i]
    auto it = upper_bound(arr.begin() + i + 1, arr.end(), -arr[i]);
    count += distance(it, arr.end());
  }

  return count;
}
```

## Code

```cpp
ll pairs_with_sum_larger_than_0(const vector<int> &arr) {
  int n = arr.size();
  int l = 0;
  int r = n - 1;

  int count = 0;
  while (l < r) {
    // arr[l] + arr[r] <= 0 (reorganized to avoid overflow)
    if (arr[l] <= -arr[r]) {
      ++l;
    } else {
      count += r - l;
      --r;
    }
  }

  return count;
}

void solve() {
  int n, x;
  cin >> n;
  vector<int> diff(n);
  for (int i = 0; i < n; ++i)
    cin >> diff[i];
  for (int i = 0; i < n; ++i) {
    cin >> x;
    diff[i] -= x;
  }

  sort(all(diff));

  cout << pairs_with_sum_larger_than_0(diff) << "\n";
}
```

## Related

- [[6 Problems/3 Sum\|3 Sum]]
- [[6 Problems/kth sum value\|kth sum value]]
