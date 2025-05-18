---
{"publish":true,"created":"2025-04-28T18:51:19.537+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[matrix decomposition\|matrix decomposition]]

This decomposition is specifically for square symmetric matrices where all values are greater than zero (**positive definite matrices**). For real-valued matrices (which is common in ML), the decomposition is defined as:

$$
A = LL^T
$$

where A is the matrix being decomposed, L is a lower triangular matrix. It can also be expressed using an upper triangular matrix (U) as $A=U^TU$.

```python
from numpy import array
from numpy.linalg import cholesky

A = array([
[2, 1, 1],
[1, 2, 1],
[1, 1, 2]])

L = cholesky(A)

print(L)
print("Reconstruct:", np.allclose(A, L @ L.T))
```

Cholesky decomposition is used for solving linear least squares problems in [[linear regression\|linear regression]], as well as in simulation and optimization methods. It's nearly twice as efficient as [[2 Zettels/LU decomposition\|LU decomposition]] for symmetric matrices.

## Related
