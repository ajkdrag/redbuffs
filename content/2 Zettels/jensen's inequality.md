---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-27T18:21:55.484+05:30"}
---


> [!Topics]
>
> - [[convex functions\|convex functions]]

Jensen’s inequality applies to **convex** functions. The basic form is as follows :

$$
f(\alpha{\bf x} + (1-\alpha){\bf y})\le\alpha f({\bf x})+(1-\alpha)f({\bf y})\quad\forall{\bf x, y}\in{X},\alpha\in[0,1]
$$

The **generalized form** of Jensen's Inequality is :

$$
f(\sum_i w_i x_i)\le \sum_i w_i f(x_i)\quad|\quad w_i\ge0,\;\sum_{i}w_i=1
$$

**Proposition:** The arithmetic mean of a set of numbers is $\ge$ their geometric mean.
**Proof** : Choose $f(x) := - \ln{x},\;w_i=\frac{1}{n}$ , Note that $-\ln{x}$ is a convex function, as a result the Jensen's inequality holds true. This gives us

$$
\begin{align*}
-\ln{\Bigg(\frac{1}{n}\sum_i{x_i}\Bigg)} &\le -\frac{1}{n}\sum_i{\ln{x_i}} \\
-\ln{\Bigg(\frac{1}{n}\sum_i{x_i}\Bigg)} &\le -\frac{1}{n}\ln{\prod_i{x_i}} \\
-\ln{\Bigg(\frac{1}{n}\sum_i{x_i}\Bigg)} &\le -\ln{\Bigg(\prod_i{x_i}\Bigg)^{\frac{1}{n}}} \\
\frac{1}{n}\sum_i{x_i} &\ge \Bigg(\prod_i{x_i}\Bigg)^{\frac{1}{n}}
\end{align*}
$$

> [!tip]
> For concave functions like $\log(x), \ln(x)$, one can flip the inequality, or use negative of the function.

## Related
