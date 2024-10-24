---
{"publish":true,"tags":["type/zettel","status/done"],"path":"2 Zettels/perceptron learning algorithm.md","permalink":"/2-zettels/perceptron-learning-algorithm/","PassFrontmatter":true}
---


> [!Topics]
> - [[classical machine learning\|classical machine learning]]
> - [[optimization\|optimization]]

The [[2 Zettels/perception classification rule\|perception classification rule]] is defined as:
$$
\hat{y}=\text{sign}(\mathbf{w}^\top \mathbf{x})
$$

We can see that $\hat{y}=1$ when $\theta<90$ and $\hat{y}=-1$ when $\theta>90$. Thus, misclassification for $n^{th}$ sample in our dataset happens when the signs of our prediction and our targets are opposite.

To "fix" this, our learning rule should move the weights vector $\mathbf{w}$ in the correct direction, which is less than 90 degrees with the positive example data vectors $y=1$ and more than 90 degrees with the negative example data vectors $y=-1$.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1729766451/perceptron%20algorithm-gxdszu.webp)

Formally, the algorithm can be spelled out as:
- Pick any misclassified datapoint from: $(x_1, y_1), (x_2, y_2), \ldots, (x_n, y_n)$, say $(x_k, y_k)$
- Update weights as: $\mathbf{w}'=\mathbf{w}+y_k\mathbf{x}_k$
- Repeat until `max_iters` or no misclassification

This will work great and converge if the **data is linearly separable**.
## Related
