---
{"publish":true,"created":"2025-04-28T14:47:01.655+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[linear algebra\|linear algebra]]
> - [[matrices\|matrices]]

The determinant of a **square matrix** is a scalar value that represents the "volume" or scaling factor of the linear transformation represented by the matrix. It's denoted as $\det(A)$ or $|A|$.

- The determinant of a matrix is the product of its [[eigenvalues\|eigenvalues]]
- A determinant of 1 means the transformation preserves the area or volume
- A determinant of 0 indicates that the matrix cannot be inverted

```python
from numpy.linalg import det

A = np.array([[1,2,3],
              [4,5,6],
              [7,8,9]])
d = det(A)  # ≈ 0 (singular)
```

## Related
