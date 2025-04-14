---
{"publish":true,"tags":["type/problem"],"platform":"Codechef","link":"https://www.codechef.com/problems/WAV2","PassFrontmatter":true,"created":"2025-03-28T20:48:29.691+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]

Chef is stuck in the wavey world of polynomials. You are given all $N$ roots of a polynomial $P(x) = \prod_{i=1}^N (x - a_i)$. The roots are pairwise distinct integers, but they are not given in any particular order.

To help Chef escape, you should answer $Q$ queries (numbered $1$ through $Q$). For each valid $i$, in the $i$-th query, you are given an integer $x_i$ and you have to determine whether $P(x_i)$ is positive, negative or $0$.

## Idea

Observe that the sign of $P(x)$ depends on the number of factors $(x - a_i)$ that are negative. Ofcourse, if $x$ is equal to any of the roots $a_i$, then $P(x) = 0$. Otherwise, we can determine the sign by counting how many roots are greater than $x$ (since for roots $\le x$, the diff is +ve and product of +ve nums is +ve). If this count is even, $P(x)$ is positive; if it's odd, $P(x)$ is negative. To efficiently find the number of roots greater than $x$, we can sort the roots and use binary search (or [[2 Zettels/partition_point in c++\|partition_point in c++]]) to find the position of $x$ in the sorted array.

**Time Complexity:** $O(N \log N + Q \log N)$, where $N$ is the number of roots and $Q$ is the number of queries. Sorting takes $O(N \log N)$ time, and each query involves a binary search taking $O(\log N)$ time.
**Space Complexity:** $O(1)$ (no extra space apart from storing array).

## Code

```cpp
void solve() {
  int n, q;
  cin >> n >> q;
  vector<int> arr(n);
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
  }
  sort(all(arr));

  int k;
  while (q--) {
    cin >> k;

    auto it = partition_point(all(arr), [&](int aj) { return aj <= k; });
    if (it != arr.begin() and *(it - 1) == k) {
      cout << 0 << '\n';
      continue;
    }
    int count_larger = distance(it, arr.end());
    if (count_larger % 2 == 0) {
      cout << "POSITIVE" << '\n';
    } else {
      cout << "NEGATIVE" << '\n';
    }
  }
}
```

## Related

- [[6 Problems/pairs\|pairs]]
