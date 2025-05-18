---
{"publish":true,"created":"2025-04-30T13:11:58.840+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/variance\|variance]]
> - [[descriptive statistics\|descriptive statistics]]

Variance measures the spread of data points around their mean. If we are given a vector $M$ and asked to find the variance, we can do the following:

```python
from numpy import array, var

M = array([1,2,2,2,5,6])
n = len(M)

M_centered = M - M.mean()
dot_prod = M_centered @ M_centered

variance = dot_prod / (n - 1)
print(variance) # 4.0

# confirming
print(var(M, ddof=1)) # 4.0
```

So basically,

- center the vector (around the mean) and get $M'$
- calc [[inner product\|inner product]]: $X \leftarrow M' \cdot M'$
- variance: $V \leftarrow \frac{X}{n-1}$

Additionally, [[2 Zettels/covariance\|covariance]], between 2 vectors $M$ and $N$ is found in the same way:

- center $M$ and $N$ around their respective means
- calc inner product between $M'$ and $N'$
- $V\leftarrow \frac{X}{n-1}$

## Related
