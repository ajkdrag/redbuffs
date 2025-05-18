---
{"publish":true,"created":"2025-01-25T10:56:05.688+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[modular arithmetic\|modular arithmetic]]
> - [[2 Zettels/prefix sums\|prefix sums]]

## Idea

Take the total sum of array -> `total`. If it's not div by `x`, `n` is the ans, otherwise, subtract from it the smallest prefix **or** suffix that's not div by `x`.

We can use [[proof by contradiction\|proof by contradiction]] to show that we can't subtract **both** prefix and the suffix:
Suppose our optimal subarray is obtained by subtracting both a prefix whose sum is `a` and a suffix whose sum is `b` from the array. Following observations are made -> `total % x = 0` (otherwise total array would have been optimal), `(total - a) % x = 0` and `(total - b) % x = 0` (otherwise we wouldn't need to subtract both prefix and suffix) and finally `(total - a - b) % x != 0` (from our assumption).

`(total-a)%x=0 and total%x=0` implies that `a%x=0`. Similary, `b%x=0`. But then this means `(total - a - b)%x = 0` since `total, a, b` all three are individually divisible by `x`. This contradicts our assumption. Thus either suffix or prefix can be subtracted to get the optimal subarray, but not both.

Note that below implementation may not be the best (is slightly different). I make a prefix sum array modulo `x` and if two positions have same value, that means that the range is divisible by `x`. In the while loops, I basically find the find first index from left and last index from right such that they make the subarray non-divisible by `x`. Creating a prefix sum is not necessary for this problem as we can simply find the `total, a and b` values using simple loops.

## Code

```cpp
int lcs_like(vector<int> &arr, int i, int j) {
  if (i > j)
    return -1;
  if (arr[i] != arr[j])
    return (j - i);

  int ti = i;
  while (ti < j) {
    if (arr[ti] == arr[j])
      ti++;
    else
      break;
  }

  int tj = j;
  while (i < tj) {
    if (arr[i] == arr[tj])
      tj--;
    else
      break;
  }

  int res = -1;
  if (ti != j)
    res = max(res, j - ti);
  if (tj != i)
    res = max(res, tj - i);

  return res;
}

void solve() {
  int n, x;
  cin >> n >> x;

  vector<int> arr(n + 1, 0);
  for (int i = 1; i <= n; ++i) {
    cin >> arr[i];
    arr[i] += arr[i - 1];
    arr[i] %= x;
  }

  int res = lcs_like(arr, 0, n);
  cout << res << endl;
}

```

## Related
