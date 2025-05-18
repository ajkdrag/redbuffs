---
{"publish":true,"created":"2025-03-21T16:24:27.260+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[binary search\|binary search]]

Given two arrays $A$ of size $N$ and $B$ of size $M$ and an integer $K$. Create a new array $C$ of size $N \times M$ consisting of $A[i] + B[j]$ for $1 \leq i \leq N, 1 \leq j \leq M$. Find the $K$-th smallest element in the array $C$.

## Idea

This problem can be solved by applying the [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]]. We are essentially searching for the K-th smallest element, which can be rephrased as finding the smallest value `x` such that there are at least `k` elements in `C` less than or equal to `x`.

We can use [[binary search\|binary search]] on the answer space for `x`. For a value `mid`, our `check(mid)` function (defined below) returns `true` if there are at least `k` elements in `C` that are less than or equal to `mid`. The conceptual boolean array in this case consists of `[F, F, F, ..., T, T, T]`, where each element represents whether there are at least `k` elements in array _C_ less than or equal to the value represented by that index. We want to find the first `T` from this boolean array.

We can check how many pairs in array _C_ have sum less than or equal to `mid` as follows: For each element in _A_, we can find number of elements in _B_ that forms a sum $\le$ `mid`. This can be done in $O(N \log M)$ by using binary search, or $O(N+M)$ by using [[2 Zettels/two pointers technique\|two pointers technique]].

> [!Tip]
> The code swaps `arr1` and `arr2` if `n > m`. This ensures that `arr1` is always the smaller array. The outer loop in the `check` function iterates through `arr1`. Therefore, making `arr1` the smaller array reduces the number of iterations in the outer loop, providing a minor optimization.

**Time Complexity**:

- Using Binary Search: $O(N \log M \cdot \log(\text{max\_sum}))$ where $\text{max\_sum}$ = maximum possible sum in array _C_
- Using Two Pointers: $O((N + M) \cdot \log(\text{max\_sum}))$
  **Space Complexity**: $O(1)$

## Code

```cpp
bool check(int mid, vector<int> &arr1, vector<int> &arr2, ll k) {
  // check if num items in sums array <= mid, is atleast k
  ll count = 0;
  for (int &x : arr1) {
    // count how many sums of it are <= mid
    int ub = mid - x;
    count += upper_bound(all(arr2), ub) - arr2.begin();
  }
  return count >= k;
}

void solve() {
  int n, m;
  ll k;
  cin >> n >> m >> k;
  vector<int> arr1(n), arr2(m);
  for (int i = 0; i < n; ++i)
    cin >> arr1[i];
  for (int i = 0; i < m; ++i)
    cin >> arr2[i];

  if (n > m) {
    swap(n, m);
    swap(arr1, arr2);
  }

  sort(all(arr1));
  sort(all(arr2));

  int lo = arr1[0] + arr2[0];
  int hi = arr1[n - 1] + arr2[m - 1];
  int ans = hi;

  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (check(mid, arr1, arr2, k)) {
      ans = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  cout << ans << endl;
}
```

**Using Two Pointers:**
Instead of using binary search inside the `check` function, we can use the [[2 Zettels/two pointers technique\|two pointers technique]]. Assume both `arr1` and `arr2` are sorted. We initialize `ptr1 = 0` (pointing to `arr1`) and `ptr2 = m - 1` (pointing to `arr2`). For each element `arr1[ptr1]`, we decrement `ptr2` until `arr1[ptr1] + arr2[ptr2] <= mid`. The count of valid pairs for `arr1[ptr1]` would be `ptr2 + 1`. This eliminates the inner binary search, replacing the $\log M$ factor with $O(1)$. We just need the `check` function to use the following logic:

```cpp
bool check(int mid, vector<int> &arr1, vector<int> &arr2, ll k) {
  ll count = 0;
  int ptr2 = arr2.size() - 1;
  for(int &x : arr1){
      while(ptr2 >= 0 && x + arr2[ptr2] > mid) ptr2--;
      count += (ptr2 + 1);
  }
  return count >= k;
}
```

## Related

- [[6 Problems/multiplication table\|multiplication table]]
- [[6 Problems/factory machines\|factory machines]]
