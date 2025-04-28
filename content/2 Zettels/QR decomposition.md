---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-28T18:46:29.828+05:30"}
---


> [!Topics]
>
> - [[matrix decomposition\|matrix decomposition]]

This technique is applicable to $n\times m$ matrices (not limited to square matrices) and decomposes a matrix (A) into an orthogonal matrix (Q) and an upper triangular matrix (R).

$$
A = QR
$$

The matrix Q has dimensions $m\times m$, and R is an $m\times n$ upper triangular matrix. QR decomposition is frequently used to solve systems of linear equations.

```python
import numpy as np

# Example 3×2 matrix (m ≥ n)
A = np.array([[12, -51],
              [ 6, 167],
              [-4,  24]], dtype=float)

# Compute QR decomposition
Q, R = np.linalg.qr(A)

print("Q (Orthogonal):\n", Q)
print("R (Upper-triangular):\n", R)

# Verify: A == Q @ R
print("Reconstruct:", np.allclose(A, Q @ R))
```

## Related

- [[2 Zettels/LU decomposition\|LU decomposition]]
