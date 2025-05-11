---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-30T13:26:03.456+05:30"}
---


> [!Topics]
>
> - [[descriptive statistics\|descriptive statistics]]
> - [[matrices\|matrices]]
> - [[2 Zettels/variance\|variance]]

Similar to [[2 Zettels/variance of a vector\|variance of a vector]], we can find variance of matrix $M$ having $n$ rows (samples) and $m$ columns (features), as follows:

```python
import numpy as np
from numpy import array, var

M = array([
        [1, 3],
        [3, 4],
        [5, 6]]
    )

n = len(M)
m = len(M[0])

# mean of features
M_mean = M.mean(axis=0)
M_centered = M - M_mean

# dot product of each feature with "itself"
# equiv to squaring and summing across cols
M_squared = np.square(M_centered)
M_summed = np.sum(M_squared, axis=0)

# divide each feature by num of samples (n - 1, for bias correction)
M_var = M_summed / (n-1)

# confirming
M_var_v2 = var(M, ddof=1, axis=0)

np.allclose(M_var, M_var_v2) # True
```

The [[2 Zettels/covariance matrix\|covariance matrix]] can also be obtained in a similar manner: $C = \frac{1}{n-1}X^TX$ where $X$ is mean-centered.

```python
# mean of features
M_mean = M.mean(axis=0)
M_centered = M - M_mean

cov_mat = (M_centered.T @ M_centered)/ (n-1)

# confirming
M_cov_mat = cov(M.T)

np.allclose(cov_mat, M_cov_mat) # True
```

> [!Tip]
>
> The diagonals of a covariance matrix contain the variances.

## Related
