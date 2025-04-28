---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-27T17:59:41.342+05:30"}
---


> [!Topics]
>
> - [[statistics\|statistics]]

Imagine we have a scatter plot of 2 variables $X$ and $Y$. A visual inspection gives us the idea that there's a positive linear relationship between $X$ and $Y$. We can formalize this is another way by saying:

> If a point $x_{i}$ is above the mean $\bar{x}$, the corresponding $y_{i}$ is **also** above the mean $\bar{y}$ and vice versa.

This formulation directly translates to the fact that the product $(x_{i}-\bar{x})(y_{i}-\bar{y})$ will be positive for all such cases, and negative otherwise. Thus, the _average_ measure for all the datapoints will be:

$$
\frac{1}{n}\sum\limits_{i=1}^{n}(x_{i}-\bar{x})(y_{i}-\bar{y})
$$

This average measure will be **positive and large** if for more datapoints, the positive linear relationship holds true, i.e. strong positive association. On the flipside, if $X$ and $Y$ had a negative linear relationship, i.e. when one goes up, the other goes down, then this measure will be **negative and large**, i.e. strong negative association.

> [!tip]
>
> Covariance measures the direction and strength of the linear relationship between two variables. The [[bias-corrected version of covariance\|bias-corrected version of covariance]] is:
>
> $$
> \frac{1}{n-1}\sum\limits_{i=1}^{n}(x_{i}-\bar{x})(y_{i}-\bar{y})
> $$

## Related
