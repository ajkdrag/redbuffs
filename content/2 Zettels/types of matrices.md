---
{"publish":true,"created":"2025-04-27T12:16:06.795+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[matrices\|matrices]]

- **Square matrix**: number or rows = number of columns
    - Has a principal diagonal
- **Row and Column matrix**: Single row or single column only
- **Singleton matrix**: Single entry/element only
- **Zero/Null matrix**: All entries are 0
- **Diagonal matrix**: All entries apart from principal diagonal are 0
    - Has to be a square matrix
- **Scalar matrix**: Diagonal matrix with all diagonal elements being same
- **Unit/Identity matrix**: Diagonal matrix with all diagonal elements being 1
- **Triangular matrix**: Square matrix in which elements above/below the principal diagonal are 0
    - _Upper/Lower_ triangular matrix, depending on whether non-zero entries are above/below diagonal
- **Equivalence matrix**: Matrices with same order/dimensions
- **Equal matrix**: Matrices with same corresponding entries
- **Transpose of a matrix**: Move rows to columns and vice versa
- **Symmetric matrix**: Matrix and its transpose are equal
- **Skew symmetric matrix**: Matrix and negative of its transpose are equal
- **Orthogonal matrix**: Square matrix Q whose rows and cols are orthonormal unit vectors
    - orthonormal unit vectors: perpendicular and have a length or magnitude of 1
    - $QQ^T=Q^TQ=I \implies Q^{-1}=Q^T$

```python
import numpy as np

# Square matrix
square = np.array([[1, 2], [3, 4]])

# Row matrix
row = np.array([[1, 2, 3]])

# Column matrix
col = np.array([[1], [2], [3]])

# Singleton matrix
singleton = np.array([5])

# Zero matrix
zero = np.zeros((2, 2))

# Diagonal matrix
diagonal = np.diag([1, 2, 3])

# Scalar matrix
scalar = 5 * np.eye(3)

# Identity matrix
identity = np.eye(3)

# Upper triangular matrix
upper = np.triu([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# Lower triangular matrix
lower = np.tril([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# Symmetric matrix
symmetric = np.array([[1, 2], [2, 1]])

# Skew-symmetric matrix
skew_symmetric = np.array([[0, 2], [-2, 0]])

# Orthogonal matrix Q: (Q.T.dot(Q) == np.eye(2))
orthogonal = np.array([[1, 0], [0, -1]])
```

## Related
