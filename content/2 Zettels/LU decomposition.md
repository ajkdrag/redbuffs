---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-28T18:19:25.617+05:30"}
---


> [!Topics]
>
> - [[matrix decomposition\|matrix decomposition]]

This method applies to _square matrices_ and decomposes a matrix (A) into a lower triangular matrix (L) and an upper triangular matrix (U).

$$
A = LU
$$

The LU decomposition is found using an iterative numerical process and can fail for those matrices that cannot be decomposed or decomposed easily. A variation of this decomposition that is numerically more stable to solve in practice is called the **LUP decomposition**, or the LU decomposition with _partial pivoting_:

$$
PA = LU
$$

where P is a permutation matrix which acts to permute the rows of A. This attempts to put large entries in the top-left position of A.

```python
import numpy as np
from scipy.linalg import lu

# Example 3×3 matrix
A = np.array([[4, 3, 2],
              [3, 2, 1],
              [2, 1, 3]], dtype=float)

# Compute LU decomposition
P, L, U = lu(A)

print("P (Permutation):\n", P)
print("L (Lower-triangular):\n", L)
print("U (Upper-triangular):\n", U)

# Verify: P @ A == L @ U
print("Reconstruct:", np.allclose(P @ A, L @ U))
```

LU decomposition is often used for:

- solving systems of linear equations
- calculating determinants
- finding matrix inverses

## Related

- [[2 Zettels/QR decomposition\|QR decomposition]]
