---
{"publish":true,"created":"2025-04-27T12:17:28.096+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[matrices\|matrices]]
> - [[linear algebra\|linear algebra]]

Let $A\in{\mathbb{R}^{n\times{n}}}$ (square matrix), the trace of $A$ (sum of diagonal elements) is defined as,

$$
Tr(A)=\sum_{i=1}^{n}A_{ii}
$$

### Properties

- Linear mapping
- Invariant under cyclic permutations i.e. $Tr(ABC)=Tr(CAB)=Tr(BCA)$
- Invariant under transpose i.e. $Tr(A^{T}B)=Tr(B^{T}A)=Tr(AB^{T})$
- For a _symmetric_ matrix $A$, we have $Tr(A)=\sum_{i=1}^{n}\lambda_{i}$ (sum of [[eigenvalues\|eigenvalues]])
    - For a _symmetric_ matrix, $Tr(A)=Tr(QDQ^T)$ by [[spectral decomposition\|spectral decomposition]]
    - Using the cyclic permutation property of trace, we have: $Tr(A)=Tr(QDQ^T)=Tr(QQ^TD)=Tr(D)=\sum_{i=1}^{n}\lambda_{i}$

```python
from numpy import trace

A = np.array([[1,2,3],
              [4,5,6],
              [7,8,9]])
t = trace(A)  # 1 + 5 + 9 = 15
```

## Related
