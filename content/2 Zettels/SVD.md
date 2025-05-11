---
{"publish":true,"tags":["type/zettel","status/done"],"aliases":["singular value decomposition"],"PassFrontmatter":true,"created":"2025-04-28T20:28:11.648+05:30"}
---


> [!Topics]
>
> - [[matrix decomposition\|matrix decomposition]]

Singular Value Decomposition (SVD) factorizes any real/complex matrix $A$ (size $m \times n$) into three matrices representing rotation, scaling, rotation:

$$
A = U \Sigma V^T
$$

- $U$: $m \times m$ orthogonal matrix (cols are called left singular vectors)
- $\Sigma$: $m \times n$ diagonal matrix (non-negative singular values $\sigma_i$ in descending order)
- $V$: $n \times n$ orthogonal matrix (rows are called right singular vectors)

> Intuitively, $V^T$ rotates (or reflects) the input space into a "principal" coordinate system; $\Sigma$ scales each coordinate by $\sigma_i$; and $U$ rotates it to the output space.

Key properties:

- Works for rectangular matrices (unlike [[2 Zettels/eigendecomposition\|eigendecomposition]])
- Singular values reveal [[2 Zettels/matrix rank\|matrix rank]]
- Stable numerical computation via iterative methods

```python
from numpy import array, diag
from numpy import diag
from scipy.linalg import svd

A = array([
[1, 2, 3],
[4, 5, 6],
[7, 8, 9]])

# factorize
U, s, V = svd(A)

# reconstruct
Sigma = diag(s)
B = U @ Sigma @ V

print(np.allclose(A, B))
```

Applications:

- Dimensionality reduction ([[2 Zettels/PCA\|PCA]])
- Data compression (low-rank approximation)
- Solving linear systems (pseudoinverse)
- Recommender systems ([[collaborative filtering\|collaborative filtering]])

## Related
