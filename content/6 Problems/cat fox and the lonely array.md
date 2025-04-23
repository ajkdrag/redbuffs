---
{"publish":true,"tags":["type/problem"],"platform":"Codeforces","link":"https://codeforces.com/contest/1973/problem/B","PassFrontmatter":true,"created":"2025-03-31T21:03:31.701+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[sliding window\|sliding window]]
> - [[bit manipulation\|bit manipulation]]

Given an array $a$ of $n$ non-negative integers, the **loneliness** of $a$ is the smallest positive integer $k$ ($1 \leq k \leq n$) such that:

For any two indices $i, j$ where $1 \leq i, j \leq n-k+1$, the following equality holds:

$$
a_i | a_{i+1} | \ldots | a_{i+k-1} = a_j | a_{j+1} | \ldots | a_{j+k-1}
$$

Where $|$ represents the bitwise OR operation.

Calculate the loneliness value of array $a$:

- The loneliness is always well-defined because when $k = n$, there is only one possible subsequence, making the condition trivially satisfied.
- The problem asks for the minimum value of $k$ where all overlapping subarrays of length $k$ have the same bitwise OR value.

## Idea

The problem asks for the smallest window size `k` such that the bitwise OR of all subarrays of size `k` is the same. We can efficiently find this smallest `k` using [[binary search\|binary search]]. For a given `k`, we need to `check` if all subarrays of size `k` have the same bitwise OR value.

### Approach 1: Sliding Window

We can use a [[sliding window\|sliding window]] of size `k` to iterate through all subarrays of length `k`. Since [[2 Zettels/bitwise OR is not invertible\|bitwise OR is not invertible]], we can't directly subtract elements when the window slides. Instead, we maintain a `bitCount` array, which acts like a [[2 Zettels/frequency array\|frequency array]] but for bits. `bitCount[b]` stores the number of elements in the current window that have the $b^{th}$ bit set.

For each window:

1.  We update the `bitCount` by removing the leftmost element and adding the rightmost element
2.  We compute the bitwise OR of the current window "manually" using the `bitCount` array in the `bits2num` function. If `bitCount[b] > 0`, it means at least one number in the window has the $b^{th}$ bit set, so the $b^{th}$ bit of the window's OR is also set
3.  We compare the current window's OR with the previous window's OR. If they are different at any point, we know that this `k` is invalid

If all windows of size `k` have the same bitwise OR, the `check` function returns true, and we try a smaller `k` in the binary search. Otherwise, we try a larger `k`.

**Time Complexity:** $O(n \log n)$ due to the [[binary search\|binary search]] ($O(\log n)$), and the `check` function takes $O(n)$
**Space Complexity:** $O(1)$ since the `bitCount` array has a fixed size of 32, regardless of the input size

### Approach 2: Prefix Sums

Instead of using a [[sliding window\|sliding window]], we can use [[2 Zettels/prefix sums\|prefix sums]] to optimize the `check` function. We precompute a 2D `prefs` array where `prefs[i][j]` stores the number of elements in `arr[0...i-1]` that have the $j^{th}$ bit set.

For a given `k`, the `check` function iterates through all subarrays of length `k` and computes the bitwise OR of each subarray using the `prefs` array. The number of ones in the $j^{th}$ bit of the subarray `arr[i-k...i-1]` is given by `prefs[i][j] - prefs[i-k][j]`. If this value is greater than 0, it means that at least one number in the subarray has the $j^{th}$ bit set, so the $j^{th}$ bit of the subarray's OR is also set.
The rest of the approach is the same with approach 1: we compare the current window's OR with the previous window's OR. If they are different at any point, we know that this `k` is invalid

**Time Complexity:** $O(n \log n)$ due to the [[binary search\|binary search]] ($O(\log n)$), and the `check` function takes $O(n)$
**Space Complexity:** $O(n)$ since the `prefs` array has a size of $n \times 32$

## Code

```cpp
// Approach 1 (Binary search + sliding window)
int bits2num(const vector<int> &bits) {
  int num = 0;
  for (int i = 0; i < 32; ++i) {
    if (bits[i] > 0) {
      num |= 1;
    }
    num <<= 1;
  }
  return num;
}

bool check(const vector<int> &arr, int k) {
  int n = (int)arr.size();
  vector<int> bitCount(32, 0);

  // initial bit counts for the first k elements
  for (int i = 0; i < k; i++) {
    for (int b = 0; b < 32; b++) {
      if (arr[i] & (1 << b)) {
        bitCount[31 - b]++;
      }
    }
  }

  // Compute the OR for the first window
  int prevOR = bits2num(bitCount);

  // Slide the window from index k to n-1
  for (int r = k; r < n; r++) {
    // Remove arr[r - k] from the window
    for (int b = 0; b < 32; b++) {
      if (arr[r - k] & (1 << b)) {
        bitCount[31 - b]--;
      }
    }
    // Add arr[r] to the window
    for (int b = 0; b < 32; b++) {
      if (arr[r] & (1 << b)) {
        bitCount[31 - b]++;
      }
    }

    // Compute the OR for the current window
    int currOR = bits2num(bitCount);

    // If this window's OR differs, fail
    if (currOR != prevOR) {
      return false;
    }
  }

  // If all windows of size k had the same OR, return true
  return true;
}

void solve() {
  int n;
  cin >> n;
  vector<int> arr(n);
  for (int i = 0; i < n; ++i)
    cin >> arr[i];

  int lo = 1;
  int hi = n;
  ll ans = hi;

  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (check(arr, mid)) {
      ans = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  cout << ans << endl;
}


// Approach 2 (Binary search + prefix sums)
bool check(int n, const vector<vi> &prefs, int k) {
  int prev = 0;
  for (int i = k; i <= n; ++i) {
    int curr = 0;

    for (int j = 0; j < 32; ++j) {
      int ones = prefs[i][j] - prefs[i - k][j];
      if (ones > 0) {
        curr |= (1 << j);
      }
    }

    if (i > k and prev != curr)
      return false;
    prev = curr;
  }

  return true;
}

void solve() {
  int n;
  cin >> n;
  vector<int> arr(n);
  vector<vi> prefs(n + 1, vi(32, 0));
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
    int curr = arr[i];
    for (int j = 0; j < 32; ++j) {
      prefs[i + 1][j] = prefs[i][j] + (curr & 1);
      curr >>= 1;
    }
  }

  int lo = 1;
  int hi = n;
  ll ans = hi;

  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (check(n, prefs, mid)) {
      ans = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  cout << ans << endl;
}
```

## Related
