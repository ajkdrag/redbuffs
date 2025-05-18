---
{"publish":true,"created":"2025-04-23T13:14:14.592+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[linear attention\|linear attention]]

In linear attention, we approximate the Q-K similarity function by using kernels that can be _decomposed_:

$$
\text{sim}(Q_i, K_j) \approx \phi(Q_i) \phi(K_j)^T
$$

where $\phi: \mathbb{R}^{d_k} \rightarrow \mathbb{R}^{c}$ represents a feature map. We are basically saying that Q and K similarity can be expressed as a dot-product in this new space obtained after transforming them by $\phi$.

> [!Note]
>
> This isn't [[2 Zettels/kernel trick\|kernel trick]] exactly, since we are **explicitly** doing the transform $x\rightarrow\phi(x)$

The choice of the feature map $\phi$ is critical. It must satisfy two potentially conflicting requirements:

- **Approximation Quality:** $\phi(q)\cdot\phi(k)$ should be a reasonably good approximation of the original similarity score, which is typically related to $\exp(q\cdot k / \sqrt{d_k})$. If the approximation is poor, the performance of the resulting attention mechanism may degrade significantly
- **Computational Feasibility:** The feature map $\phi$ must be efficiently computable, and its dimension $c$ should not be excessively large

Common choices for $\phi$ include simple activations like $\phi(x)=\text{elu}(x)+1$, the identity function $\phi(x)=x$ (leading to unnormalized linear attention), random features designed to approximate Gaussian or [[softmax\|softmax]] kernels (as in [[performer\|performer]]), or polynomial features.

An important question is how to handle the normalization inherent in the softmax function. Standard softmax ensures attention weights sum to 1 for each query, acting as a probability distribution over the value vectors. The denominator term in [[2 Zettels/linear attention math formulation\|linear attention math formulation]]: $\phi(Q)Z$ is an approximation which if very small, can lead to numerical instability. Few methods to address this:

- omit the normalization (denominator) altogether and use alternative normalization schemes
- design kernels with specific properties
- introducing gating mechanisms
- use different approximation strategies like [[nystrom method for matrix approximation\|nystrom method for matrix approximation]], as seen in [[nystromformer\|nystromformer]]

## Related
