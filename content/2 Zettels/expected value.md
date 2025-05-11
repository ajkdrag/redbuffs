---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-29T11:31:13.276+05:30"}
---


> [!Topic]
>
> - [[probability\|probability]]
> - [[descriptive statistics\|descriptive statistics]]

The expected value represents the long-run average of a random variable's possible outcomes. It's calculated as the sum of all possible values weighted by their probabilities.

For discrete random variables:

$$
E[X] = \sum x_i \cdot P(x_i)
$$

For continuous variables:

$$
E[X] = \int_{-\infty}^{\infty} x f(x) dx
$$

Key properties:

- Linearity: $E[aX + b] = aE[X] + b$
- Additivity: $E[X + Y] = E[X] + E[Y]$

The _sample_ mean

$$
\bar{x} = \frac{1}{n}\sum_{i=1}^n x_i
$$

estimates the _population_ expected value $\mu$ from observed data

```python
from numpy import array, mean

M = array([
[1,2,3,4,5,6],
[1,2,3,4,5,6]])

col_mean = mean(M, axis=0)
row_mean = mean(M, axis=1)
```

## Related

- [[2 Zettels/variance\|variance]]
