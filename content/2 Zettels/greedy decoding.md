---
{"publish":true,"tags":["status/done","type/zettel"],"PassFrontmatter":true,"created":"2025-04-11T15:25:38.514+05:30"}
---



> [!Topics]
> - [[decoding strategies\|decoding strategies]]
> - [[2 Zettels/greedy algorithm\|greedy algorithm]]

 The simplest decoding method which selects the most probable token at each step $t$.
In an [[2 Zettels/encoder-decoder architecture\|encoder-decoder architecture]] where we condition on input $X$ and previous token outputs $\hat{y}_1,\ldots,\hat{y}_{t-1}$
$$
\hat{y}_t = \underset{w \in V}{\arg\max}\,P_\theta(\hat{y}_t = w\mid \hat{y}_{1:t-1}, X)
$$
Note that in practice, we don't directly condition on input $X$, but use the context variable $\mathbf{c}$ produced by the encoder to represent the input sequence.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1728188941/us3pcgl1tkqshju20wwe.png)

## Related
- [[2 Zettels/beam search\|beam search]]
- [[contrastive search\|contrastive search]]
