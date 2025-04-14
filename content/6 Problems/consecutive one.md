---
{"publish":true,"tags":["type/problem"],"platform":"AlgoZenith","link":null,"PassFrontmatter":true,"created":"2025-03-21T20:34:16.488+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[2 Zettels/precomputation techniques\|precomputation techniques]]

We are given a binary array of length $N$. The score is the length of the longest continuous subsegment of $1$s. We want to find the maximum score if we can change at most $K$ elements.

## Idea

We binary search on the length of the subsegment. For a given length `mid`, we check if it's possible to have a subsegment of length `mid` with at most $K$ flips. To check this, we iterate through all possible subsegments of length `mid` and count the number of zeros in each subsegment. If the number of zeros is less than or equal to $K$, then it's possible to have a subsegment of length `mid`.

To efficiently count the number of zeros in each subsegment, we can _precompute_ the [[2 Zettels/prefix sums\|prefix sums]] of the array. Then, the number of ones in a subsegment from `l` to `r` is `pref[r+1] - pref[l]`. The number of zeros is simply `mid` - (number of ones).

This approach combines binary search with the prefix sum technique to efficiently find the maximum possible length. The binary search helps us find the optimal length, and the prefix sum allows us to quickly calculate the number of zeros in each subsegment.

## Code

```cpp
bool check(int mid, vector<int> &pref, int k) {
  int sz = pref.size();
  for (int i = mid; i < sz; ++i) {
    int l = i - mid;
    int num_ones = pref[i] - pref[l];
    if (mid - num_ones <= k)
      return true;
  }
  return false;
}

void solve() {
  int n, k;
  cin >> n >> k;
  vector<int> arr(n), pref(n + 1);
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
    pref[i + 1] = pref[i] + arr[i];
  }

  int lo = 1;
  int hi = n;
  int ans = 0;

  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (check(mid, pref, k)) {
      ans = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  cout << ans << '\n';
}
```

### Alternative check function (Sliding Window)

Here's an alternative `check` function that uses a [[2 Zettels/sliding window with fixed window size\|sliding window with fixed window size]] approach, removing the need for a prefix sum array:

```cpp
bool check(int mid, vector<int> &arr, int k) {
  int zeros = 0;
  for (int i = 0, n = arr.size(); i < n; ++i) {
    if (i < mid && arr[i] == 0) {
      zeros++;
    }
    if (i >= mid) {
      if (arr[i] == 0)
        zeros++;
      if (arr[i - mid] == 0)
        zeros--;
    }
    if (i >= mid - 1 && zeros <= k)
      return true;
  }
  return false;
}
```

This `check` function maintains a sliding window of size `mid` and counts the number of zeros within that window. If the number of zeros is less than or equal to `k`, it returns `true`. The function slides the window across the array, updating the zero count as it moves. This approach avoids precomputation and saves extra space.

### Time and Space Complexity

**Original Solution (with Prefix Sums):**

- **Time Complexity:** $O(N \log N)$. The binary search takes $O(\log N)$ iterations, and the `check` function with prefix sums takes $O(N)$ time in the worst case
- **Space Complexity:** $O(N)$ due to the `pref` vector used to store the prefix sums

**Alternative Solution (Sliding Window):**

- **Time Complexity:** $O(N \log N)$. The binary search still takes $O(\log N)$ iterations, and the `check` function takes $O(N)$ time
- **Space Complexity:** $O(1)$, as it only uses a constant amount of extra space

## Related

- [[6 Problems/flipping game\|flipping game]]
