---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-02-05T18:52:31.617+05:30"}
---


> [!Topics]
> - [[dynamic programming\|dynamic programming]]
> - [[combinatorics\|combinatorics]]

The core idea is based on [[2 Zettels/pascal's triangle\|pascal's triangle]], where each entry is the sum of the two entries directly above it.

The algorithm constructs a table `C` where `C[i][j]` stores the value of $\binom{i}{j}$. The base cases are $\binom{i}{0}=\binom{i}{i}=1$. The [[2 Zettels/binomial coefficient recursive relation\|binomial coefficient recursive relation]] is:

$$
\binom{i}{j}=\binom{i-1}{j-1} + \binom{i-1}{j}
$$

This relation allows us to build the table row by row, avoiding redundant calculations. The final result, $\binom{n}{r}$, is then found at `C[n][r]`.

```python
def nCr(n, r):
    C = [[0]*(r+1) for _ in range(n+1)]
    for i in range(n+1):
        for j in range(min(i, r)+1):
            if j == 0 or j == i:
                C[i][j] = 1
            else:
                C[i][j] = C[i-1][j-1] + C[i-1][j]
    return C[n][r]
```

T.C: $O(n^2)$
S.C: $O(n^2)$

## Related
- [[2 Zettels/binomial coefficient using factorials\|binomial coefficient using factorials]]
