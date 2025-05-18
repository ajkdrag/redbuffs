---
{"publish":true,"created":"2025-03-14T15:59:35.849+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[basic arithmetic\|basic arithmetic]]

The key challenge in this problem is to figure out, for each $k$, the maximum number of times (let's denote it by $p$) we can pick exactly $k$ distinct cards before running out of valid options.

## Idea

### Reformulating the Problem

1. We have $m$ distinct integers overall, and for each distinct integer $i$, we know its frequency $f_i$
2. We want to form $p$ disjoint groups, each of size $k$, where each group has distinct integers

The distinctness requirement implies that if we want to form $p$ such groups, each integer $i$ can contribute at most $\min(f_i, p)$ times overall (because you cannot use the same integer more than once in the same group, but you can reuse it in different groups).

Hence, the feasibility condition for a given $p$ is:

$$
\sum_{i=1}^{m} \min(f_i, p) \;\; \ge \;\; p \times k.
$$

If this sum is large enough, we can form $p$ groups each of size $k$.

### Binary Search Over $p$

To find the maximum valid $p$, we can binary-search over possible values of $p$. Let’s denote:

- $f_1 \le f_2 \le \dots \le f_m$ the sorted frequencies
- A prefix sum array $S$ where $S[i]$ = $f_1 + f_2 + \cdots + f_i$

We check feasibility with:

$$
\text{can\_form\_partitions}(p) \;\;=\;\;
\sum_{i=1}^{m} \min(f_i, p) \; \ge \; p \times k.
$$

Instead of computing the sum of $\min(f_i, p)$ naively, we note:

- All $f_i > p$ contribute exactly $p$
- All $f_i \le p$ contribute exactly $f_i$

Sort $f$. If $i^*$ is the _smallest index_ such that $f_{i^*} > p$, then

$$
\sum_{i=1}^{m} \min(f_i, p)
= \sum_{i=1}^{i^*-1} f_i \;+\; p \times (m - (i^* - 1)).
$$

Using [[2 Zettels/prefix sums\|prefix sums]] and a binary search ($\text{bisect\_right}$ in the code) on the frequencies, we can compute this in $O(\log m)$. Doing that for each $k$ up to $N$ is acceptable given the constraints.

### Edge Cases

- **$k = 1$**: We can take every card on its own, so the answer is simply the sum of all frequencies
- **$k > m$**: Impossible to form a group of size $k$ if there aren’t $k$ distinct integers

### Complexity

- Building the frequency array and prefix sums: $O(N)$
- For each $k$, we do a binary search in $O(\log N)$
- Overall, $O(N \log N)$ for all $k$ from 1 to $N$

## Code

```python
import sys
import bisect
from collections import Counter


def max_partitions(items_dict, k, prefix_sums, counts):
    # Handle edge cases
    if k <= 0 or k > len(items_dict):
        return 0

    # Special case for k=1
    if k == 1:
        return sum(items_dict.values())

    n = len(items_dict)

    def can_form_partitions(p):
        idx = bisect.bisect_right(counts, p)
        available_items = p * (n - idx) + prefix_sums[idx]
        return available_items >= p * k

    # Binary search for the maximum valid number of partitions
    left, right = 0, prefix_sums[n] // k
    result = 0

    while left <= right:
        mid = (left + right) // 2
        if can_form_partitions(mid):
            result = mid
            left = mid + 1
        else:
            right = mid - 1

    return result


def solve(N, arr):
    items_dict = Counter(arr)
    counts = sorted(list(items_dict.values()))
    n = len(counts)

    # Precompute prefix sums
    prefix_sums = [0] * (n + 1)
    for i in range(n):
        prefix_sums[i + 1] = prefix_sums[i] + counts[i]

    for i in range(1, N+1):
        ans = max_partitions(items_dict, i, prefix_sums, counts)
        print(ans)


def main():
    n = int(sys.stdin.readline().strip())
    arr = list(map(int, sys.stdin.readline().strip().split()))
    solve(n, arr)


if __name__ == "__main__":
    main()
```

## Related

- [[6 Problems/color balls\|color balls]]
  - simpler version of the problem
