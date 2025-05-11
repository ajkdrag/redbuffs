---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-27T17:59:41.342+05:30"}
---


> [!Topics]
>
> - [[descriptive statistics\|descriptive statistics]]

Covariance measures the **joint probability** of two random variables and describes how they change together. It is denoted as $cov(X,Y)$. It's the expected value of the product of the differences of each variable from their expected values:

$$
cov(X, Y)=E[(X - E[X])]\times E[(Y - E[Y])]
$$

If you observe above formula, $cov(X, X) = var(X)$

**Intuition:** Say we have a scatter plot of 2 variables $X$ and $Y$. A visual inspection gives us the idea that there's a positive linear relationship between $X$ and $Y$. We can formalize this is another way by saying:

> If a point $x_{i}$ is above the mean $\bar{x}$, the corresponding $y_{i}$ is **also** above the mean $\bar{y}$ and vice versa.

This formulation directly translates to the fact that the product (a measure) $(x_{i}-\bar{x})(y_{i}-\bar{y})$ will be positive for all such cases, and negative otherwise. Thus, the _average measure_ for all the datapoints will be:

$$
\frac{1}{n}\sum\limits_{i=1}^{n}(x_{i}-\bar{x})(y_{i}-\bar{y})
$$

This average measure will be **positive and large** if for more datapoints, the positive linear relationship holds true, i.e. strong positive association. On the flipside, if $X$ and $Y$ had a negative linear relationship, i.e. when one goes up, the other goes down, then this measure will be **negative and large**, i.e. strong negative association.

> The sign of the covariance indicates whether the variables increase together (positive) or decrease together (negative). A covariance of zero means they are independent.

Similar to [[2 Zettels/variance\|variance]], we can calculate the sample covariance using [[bessel's correction\|bessel's correction]]:

$$
\frac{1}{n-1}\sum\limits_{i=1}^{n}(x_{i}-\bar{x})(y_{i}-\bar{y})
$$

```python
# vector covariance
from numpy import array, cov

x = array([1,2,3,4,5,6,7,8,9])
y = array([9,8,7,6,5,4,3,2,1])

Sigma = cov(x,y)[0,1]
```

## Related

- [[2 Zettels/covariance matrix\|covariance matrix]]
