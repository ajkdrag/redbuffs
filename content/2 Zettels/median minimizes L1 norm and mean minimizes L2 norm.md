---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-02-25T15:41:28.723+05:30"}
---


> [!Topics]
> - [[geometry\|geometry]]
> - [[distance metrics\|distance metrics]]

## Median Minimizes the L1 Norm

Suppose we have a set $S$ of real numbers. The L1 norm:
$$
\sum_{s \in S} |s - x|
$$
is minimized when $x$ is a median of $S$.

### Proof
Consider two real numbers $a < b$. The objective function for this pair is:
$$
\text{dist}(a, b) = |x - a| + |x - b|.
$$
This expression is minimized when $a \leq x \leq b$. To verify, analyze three cases:
1. If $x < a$: The sum becomes $(a - x) + (b - x) = (a + b) - 2x$, which decreases as $x$ increases toward $a$.
2. If $a \leq x \leq b$: The sum simplifies to $(x - a) + (b - x) = b - a$, a constant.
3. If $x > b$: The sum becomes $(x - a) + (x - b) = 2x - (a + b)$, which increases as $x$ increases.

Thus, the minimum occurs when $x \in [a, b]$.

For the general case with $n$ elements, sort $S$ as $S_1, S_2, \ldots, S_n$. Pair the smallest and largest elements: $(S_1, S_n)$, $(S_2, S_{n-1})$, etc. Each pair constrains $x$ to lie within their interval. Remove these pairs iteratively:
- If $n$ is odd, one element $S_{\text{mid}}$ remains, and $x = S_{\text{mid}}$ (the median) minimizes the sum.
- If $n$ is even, all elements are paired, and $x$ can be any value within the innermost pair’s interval $[S_{n/2}, S_{n/2+1}]$.

Thus, the median (or interval of medians) minimizes the L1 norm.

## Mean Minimizes the L2 Norm

For the same set $S$, the L2 norm (squared Euclidean distance):
$$
\sum_{s \in S} (s - x)^2
$$
is minimized when $x$ is the mean of $S$.

### Proof
Define the objective function:
$$
f(x) = \sum_{i=1}^n (s_i - x)^2.
$$
To find the minimum, compute the derivative with respect to $x$:
$$
f'(x) = -2 \sum_{i=1}^n (s_i - x).
$$
Set $f'(x) = 0$:
$$
-2 \sum_{i=1}^n (s_i - x) = 0 \implies \sum_{i=1}^n s_i = nx \implies x = \frac{1}{n} \sum_{i=1}^n s_i.
$$
This is the mean of $S$.

To confirm this critical point is a minimum, check the second derivative:
$$
f''(x) = 2n > 0 \quad \text{(for $n \geq 1$)},
$$
which ensures convexity. Hence, $x = \text{mean}(S)$ uniquely minimizes the L2 norm.

## Comparison

1. **Robustness vs. Sensitivity**:
   - The *median* minimizes the L1 norm and is robust to outliers
   - The *mean* minimizes the L2 norm but is sensitive to outliers

2. **Uniqueness**:
   - The L1 minimizer (median) may be an *interval* for even-sized datasets
   - The L2 minimizer (mean) is always unique

## Related
