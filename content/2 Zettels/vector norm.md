---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-28T13:33:52.971+05:30"}
---


> [!Topics]
>
> - [[distance metrics\|distance metrics]]
> - [[linear algebra\|linear algebra]]

**Vector norm**: function that assigns non-negative length/size to a vector. For vector $\mathbf{v}$ in $\mathbb{R}^n$, $p$-norm written as $\|\mathbf{v}\|_p$, satisfying:

1.  **Non-negativity**: $\|\mathbf{v}\|_p \ge 0$, $= 0$ only if $\mathbf{v} = \mathbf{0}$
2.  **Absolute homogeneity**: $\|\alpha \mathbf{v}\|_p = |\alpha| \cdot \|\mathbf{v}\|_p$ for any scalar $\alpha$
3.  **Triangle inequality**: $\|\mathbf{u} + \mathbf{v}\|_p \le \|\mathbf{u}\|_p + \|\mathbf{v}\|_p$
4.  **Definiteness**: $\|\mathbf{v}\|_p = 0 \iff \mathbf{v} = \mathbf{0}$

### L1 Norm (Manhattan Norm)

$$
\|\mathbf{v}\|_1 = \sum_{i=1}^n |v_i|
$$

- **Notation**: $\|\mathbf{v}\|_1$
- **Definition**: Sum of absolute components
- **Interpretation**: "Taxicab"/"Manhattan" distance from origin
- **Use in ML**: As a regularizer, it encourages sparsity ([[L1 regularization\|L1 regularization]])

### L₂ Norm (Euclidean Norm)

$$
\|\mathbf{v}\|_2 = \sqrt{\sum_{i=1}^n v_i^2}
$$

- **Notation**: $\|\mathbf{v}\|_2$ (often just $\|\mathbf{v}\|$)
- **Definition**: Square root of sum of squares
- **Interpretation**: Standard Euclidean distance from origin
- **Use in ML**: Common regularizer (L2 regularization), ridge regression, weight decay

### Max (∞) Norm

$$
\|\mathbf{v}\|_{\infty} = \max_{1 \le i \le n} |v_i|
$$

- **Notation**: $\|\mathbf{v}\|_{\infty}$
- **Definition**: Maximum absolute component
- **Interpretation**: Greatest distance along any single coordinate axis
- **Use in ML**: Bounding weights (max-norm regularization in neural nets)

### General p-Norms and Properties

$$
\|\mathbf{v}\|_p = \bigl(\sum_{i=1}^n |v_i|^p\bigr)^{1/p}
$$

- $p$-norm for $1 \le p < \infty$:
- As $p \to \infty$, $\|\mathbf{v}\|_p \to \|\mathbf{v}\|_{\infty}$
- All satisfy triangle inequality and definiteness

```python
from math import inf
from numpy import array
from numpy.linalg import norm


a = array([1, 2, 3])

l1 = norm(a, 1)
l2 = norm(a, 2)
l_inf = norm(a, inf)
```

### Why Vector Norms Matter in Machine Learning

- **Regularization**: Adding $\|\mathbf{w}\|_1$ or $\|\mathbf{w}\|_2$ penalties controls model complexity
- **Distance Measures**: Nearest-neighbor classifiers, clustering rely on L1/L2 distances
- **Optimization Geometry**: Norms define contours, influence convergence of gradient-based methods

## Related
