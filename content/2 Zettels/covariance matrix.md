---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-29T14:23:54.202+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/covariance\|covariance]]
> - [[matrices\|matrices]]

Square symmetric matrix capturing pairwise covariances between variables in a dataset. For random vector $X = [X_1, X_2, ..., X_n]^T$, the covariance matrix $\Sigma$ has elements:

$$
\Sigma_{ij} = \text{Cov}(X_i, X_j) = \mathbb{E}[(X_i - \mu_i)(X_j - \mu_j)]
$$

Diagonal contains [[2 Zettels/variance\|variance]] values $\Sigma_{ii} = \text{Var}(X_i)$. Off-diagonals show how variables change together.

```python
from numpy import array, cov

X = array([
[1, 5, 8],
[3, 5, 11],
[2, 4, 9],
[3, 6, 10],
[1, 5, 10]])

Sigma = cov(X.T)

# [1.0, 0.25, 0.75]
# [0.25, 0.5, 0.25]
# [0.75, 0.25, 1.2999999999999998]
```

### Key Properties

- Symmetric: $\Sigma = \Sigma^T$
- Positive semi-definite: $v^T\Sigma v \geq 0$ for any vector $v$
- Measures linear relationships between variables
- Scale-dependent (affected by units of measurement)

The covariance matrix helps in understanding the relationships between variables and is used in methods like Principal Component Analysis ([[2 Zettels/PCA\|PCA]]) for [[dimensionality reduction\|dimensionality reduction]].

## Related

- [[2 Zettels/variance of a vector\|variance of a vector]]
- [[correlation matrix\|correlation matrix]] (normalized covariance matrix)
- [[precision matrix\|precision matrix]] (inverse of covariance matrix)
