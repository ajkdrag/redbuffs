---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[dynamic programming\|dynamic programming]]
> - [[combinatorics\|combinatorics]]

The core idea is based on [[pascal's triangle\|pascal's triangle]], where each entry is the sum of the two entries directly above it.

The algorithm constructs a table `C` where `C[i][j]` stores the value of $\binom{i}{j}$. The base cases are $\binom{i}{0}=\binom{i}{i}=1$. The recursive relation is:

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

## Related
