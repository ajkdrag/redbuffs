---
{"publish":true,"created":"2025-04-29T11:40:48.735+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[descriptive statistics\|descriptive statistics]]
> - [[probability\|probability]]

Variance measures the spread of data points around their mean, quantifying how much values in a distribution _deviate_ from the expected value.

For a random variable $X$, variance is defined as:

$$
Var(X) = E[(X - E[X])^2]
$$

This represents the expected squared deviation from the mean. For discrete random variables with $n$ equally likely outcomes:

$$
Var(X) = \frac{1}{n}\sum_{i=1}^n (x_i - \mu)^2
$$

Key properties:

- Always non-negative ($Var(X) \geq 0$)
- $Var(aX + b) = a^2Var(X)$ for constants $a,b$
- For independent variables, $Var(X + Y) = Var(X) + Var(Y)$

### Sample Variance

In statistics, sample variance _estimates_ population variance from a finite sample. The unbiased estimator uses [[bessel's correction\|bessel's correction]]:

$$
s^2 = \frac{1}{n-1}\sum_{i=1}^n (x_i - \bar{x})^2
$$

Where $\bar{x}$ is the sample mean. The $n-1$ denominator corrects bias in the estimation.

In Python's NumPy:

- `np.var()` computes population variance (by default)
- Set `ddof=1` for sample variance (default `ddof=0`)

```python
from numpy import array, var

M = array([
[1,2,3,4,5,6],
[1,2,3,4,5,6]])

col_var = var(M, ddof=1, axis=0)
row_var = var(M, ddof=1, axis=1)
```

> [!Note]
> The choice between population and sample variance depends on whether you're describing the entire population or estimating from a sample.

## Related

- [[2 Zettels/variance of a vector\|variance of a vector]]
