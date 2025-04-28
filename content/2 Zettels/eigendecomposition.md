---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-28T19:14:24.198+05:30"}
---


> [!Topics]
>
> - [[matrix decomposition\|matrix decomposition]]

Eigendecomposition decomposes square matrix into [[eigenvectors and eigenvalues\|eigenvectors and eigenvalues]]. Key operation in linear algebra with applications in machine learning like [[PCA\|PCA]].

For square matrix $A$, eigenvector $v$ satisfies:

$$
Av = \lambda v
$$

Where $\lambda$ is eigenvalue. Eigenvector changes only in magnitude when multiplied by $A$, not direction.

Key properties:

- Eigenvectors are unit vectors (length 1)
- Eigenvalues can be positive (stretching) or negative (flipping direction)
- Positive definite matrices have all positive eigenvalues

### Computation

Eigendecomposition of $A$:

$$
A = Q \Lambda Q^{-1}
$$

Where:

- $Q$ is matrix of eigenvectors
- $\Lambda$ is diagonal matrix of eigenvalues
- $Q^{-1}$ is inverse of $Q$

```python
import numpy as np
from numpy import array, diag
from numpy.linalg import inv, eig

A = array([
[1, 2, 3],
[4, 5, 6],
[7, 8, 9]])

# decompose
values, Q = eig(A)

# create diagonal matrix of eigenvalues
L = diag(values)
Q_inv = inv(Q)

# reconstruct the original matrix
A_recon = Q @ L @ Q_inv

print(np.allclose(A_recon, A))
```

Main uses:

- Simplifies matrix operations like exponentiation
- Principal Component Analysis (PCA) for [[dimensionality reduction\|dimensionality reduction]]
- Provides insights into matrix properties

> Eigendecomposition doesn't compress data but makes matrix operations more efficient.
