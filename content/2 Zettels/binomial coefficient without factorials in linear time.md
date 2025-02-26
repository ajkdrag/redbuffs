---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-02-07T16:52:28.985+05:30"}
---


> [!Topics]
> - [[binomial coefficient\|binomial coefficient]]

Instead of calculating factorials (which are slow for large values), we can use a direct way to compute $C(n, k)$ iteratively,
$$
C(n, k)=C(n,k-1)\times \frac{n-k+1}{k}
$$

```python
def binomial_coefficient(n, k):
    if k > n - k:
        k = n - k  # Use C(n, k) = C(n, n-k) for efficiency
    res = 1
    for i in range(k):
        res = res * (n - i) // (i + 1)
    return res

print(binomial_coefficient(5, 2))  # Output: 10
```

This runs in $O(k)$ time, which is optimal.

## Related
