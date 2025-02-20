---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2024-11-18T14:31:45.669+05:30"}
---


> [!Topics]
> - [[mixture of experts\|mixture of experts]]

In MoEs, a learned gating network (G) is used to generate **routing scores** for all experts, followed by:

1. selecting the experts (Top-K or noisy Top-K)
2. normalization of scores for those selected experts  ⎯ `softmax` commonly used
3. combine their outputs using these normalized weights

> [!Warning]
> Steps 1. and 2. aren't exactly followed as is. Implementations and their order vary.

The last step is mathematically represented as,
$$
y=\sum^{n}_{i=1}G(x)_i E_i(x)
$$
G is typically a simple network with weights $W_g$. One can choose to selec
$$
\begin{align*}
G(x)&=\operatorname{Softmax}(x \cdot W_g) \\
G(x)&=\operatorname{Softmax}(\operatorname{KeepTopK}(H(x))
\end{align*}
$$
Noisy Top-k Gating introduces some (tunable) noise and then keeps the top k values. 

> [!Question]
> **Why not just select the top expert?** 
> The initial conjecture was that routing to more than one expert was needed to have the gate learn how to route to different experts, so at least two experts had to be picked.


## Related
