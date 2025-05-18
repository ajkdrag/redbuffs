---
{"publish":true,"created":"2025-03-13T13:06:53.222+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[string algorithms\|string algorithms]]
> - [[binary search\|binary search]]

This problem asks us to find the maximum number of characters Nastya can remove from string $t$ such that the remaining string can still be reduced to string $p$. Nastya removes characters according to a given permutation.

## Idea

The key observation is that if Nastya can remove $k$ characters and still obtain $p$, she can also remove any number of characters less than $k$ and still obtain $p$. This monotonicity allows us to use [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]] on the number of chars Nastya removes, say $r$.

Now, we need to check if the string $p$ is a subsequence of the string $t$ after $r$ removals. This can be done through [[2 Zettels/standard string subsequence check algorithm\|standard string subsequence check algorithm]]:

- Iterate through both strings, $t$ and $p$, with pointers, say $a$ and $b$ respectively
- If $t[a]$ is marked as removed (`removed[a]` is true), we simply skip it and increment $a$
- If it's not removed, we compare $t[a]$ with $p[b]$. If they match, we increment both $a$ and $b$
- If they don't match, we only increment $a$
- If we have reached the end of $p$ i.e., $b=\text{length}(p)$, it means $p$ is a subsequence

> [!Note]
> We initialize the search range from $0$ (it's a possibility that we shouldn't remove any character) to $|t|$.

For each mid value in binary search, we call the `check` function. If `check(mid)` is true, it means Nastya can remove at least `mid` characters, so we try for a larger number of removals by setting the lower bound of binary search to $mid + 1$. Otherwise, if `check(mid)` is false, it means Nastya cannot remove `mid` characters and still get $p$, so we reduce the upper bound of binary search to $mid - 1$. The largest value of `mid` for which `check(mid)` is true is our answer.

**Time Complexity:**
The `check` function involves:

1.  Initializing the `removed` array using `fill`: $O(|t|)$
2.  Subsequence check: $O(|t|)$ (worst case we iterate over entire $t$)

Thus, each call to `check` takes $O(|t|)$ time. The binary search performs $O(\log |t|)$ calls to `check`. Therefore, the overall time complexity is $O(|t| \log |t|)$

**Space Complexity:**
The space complexity is determined by the storage used:

1.  Strings $t$ and $p$: $O(|t| + |p|)$
2.  `perm` vector: $O(|t|)$
3.  `removed` vector: $O(|t|)$

## Code

```cpp
bool check(string &t, string &p, int r, vector<int> &perm,
           vector<int> &removed) {

  fill(all(removed), 0);
  for (int i = 1; i <= r; ++i) {
    removed[perm[i - 1] - 1] = 1;
  }

  int a = 0, b = 0;
  int amax = t.size();
  int bmax = p.size();

  // modified string subsequence check
  while (a < amax && b < bmax) {
    if (removed[a] == 1) {
      a++;
      continue;
    }
    if (t[a] == p[b]) {
      a++;
      b++;
    } else {
      a++;
    }
  }
  return b == bmax;
}

void solve() {
  string t, p;
  cin >> t >> p;
  int n = t.size();
  vector<int> perm(n);
  vector<int> removed(n, 0);

  for (int i = 0; i < n; ++i)
    cin >> perm[i];

  int lo = 0;
  int hi = n;
  int ans = 0;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (check(t, p, mid, perm, removed)) {
      ans = mid;
      lo = mid + 1;
    } else
      hi = mid - 1;
  }

  cout << ans << endl;
}
```

## Related
