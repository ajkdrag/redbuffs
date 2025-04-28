---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-27T12:37:10.087+05:30"}
---


> [!Topics]
>
> - [[curse of dimensionality\|curse of dimensionality]]

Many machine learning algorithms rely on distances between data points as their input, sometimes the only input, especially so for clustering and ranking algorithms. Also, [[2 Zettels/increased dimensionality leads to data sparsity\|increased dimensionality leads to data sparsity]]. This means that even if a data point ranks **closest** to another data point, it can still be very, *very far*.

> In the paper [When is Nearest Neighbors Meaningful?](https://link.springer.com/chapter/10.1007%2F3-540-49257-7_15) the authors argue that for many data distribution and distance functions, the ratio of distances between nearest and farthest neighbors is almost 1 (so more or less the same).

### Example

For any point $A$, let's assume $\operatorname{dist}_{\min}(A)$ is the minimum distance between $A$ and its nearest neighbor, while $\operatorname{dist}_{\max}(A)$ is the maximum distance between $A$ and its farthest neighbor.

In 1-D, 2-D or even 3-D,

$$
\frac{\operatorname{dist}_{\max}(A) - \operatorname{dist}_{\min}(A)}{\operatorname{dist}_{\min}(A)} > 0
$$

But, as the dimensions increase, i.e. $\operatorname{dim}\rightarrow{\infty}$,

$$
\lim_{\operatorname{dim}\rightarrow \infty} \frac{\operatorname{dist}_{\max}(A) - \operatorname{dist}_{\min}(A)}{\operatorname{dist}_{\min}(A)} \rightarrow 0
$$

That is, for a $d$-dimensional space, given $n$ random points, any given pair of points are almost equidistant to each other as $d\rightarrow \infty$. In such cases, any machine learning algorithms which are based on the distance measure including [[KNN algorithm\|KNN algorithm]] (k-Nearest Neighbor) tend to fail.

## Related
