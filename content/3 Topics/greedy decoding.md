---
{"publish":true,"tags":["status/done","type/topic"],"path":"3 Topics/greedy decoding.md","permalink":"/3-topics/greedy-decoding/","PassFrontmatter":true}
---


Topics: [[decoding strategies\|decoding strategies]]
Links: [[3 Topics/beam search\|beam search]] | [[contrastive search\|contrastive search]]

 The simplest decoding method which selects the most probable token at each step $t$.
In an [[3 Topics/encoder-decoder architecture\|encoder-decoder architecture]] where we condition on input $X$ and previous token outputs $\hat{y}_1,\ldots,\hat{y}_{t-1}$
$$
\hat{y}_t = \underset{w \in V}{\arg\max}\,P_\theta(\hat{y}_t = w\mid \hat{y}_{1:t-1}, X)
$$
Note that in practice, we don't directly condition on input $X$, but use the context variable $\mathbf{c}$ produced by the encoder to represent the input sequence.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1728188941/us3pcgl1tkqshju20wwe.png)
