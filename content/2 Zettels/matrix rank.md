---
{"publish":true,"created":"2025-04-28T15:19:52.927+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[linear algebra\|linear algebra]]
> - [[matrices\|matrices]]

The rank of a matrix is an estimate of the number of linearly independent rows or columns in the matrix. It is denoted as $\text{rank}(A)$. The rank provides an intuition about the dimensionality of the [[vector space\|vector space]] spanned by the vectors within the matrix:

- a rank of 1 suggests the vectors span a line
- a rank of 2 suggests they span a plane, etc

The rank is typically estimated numerically, using the Singular-Value Decomposition ([[2 Zettels/SVD\|SVD]]).

> The rank indicates the number of linearly independent directions within the matrix, not necessarily the number of dimensions of the matrix itself

```python
from numpy.linalg import matrix_rank

A0 = np.zeros((3,3))
r0 = matrix_rank(A0)  # 0

A1 = np.array([[1,2,3],
               [1,2,3],
               [1,2,3]])
r1 = matrix_rank(A1)  # 1

A2 = np.eye(3)
r2 = matrix_rank(A2)  # 3
```

## Related
