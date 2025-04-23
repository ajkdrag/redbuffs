---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-16T12:35:51.811+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/attention mechanism\|attention mechanism]]

Core attention operation in [[2 Zettels/transformer\|transformer]] architectures. Computes weighted sum of values ($V$) based on query-key ($Q$, $K$) similarities:

$$
Attention(Q,K,V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

**Components**:

- $Q$: What we're looking for
- $K$: What's available to attend to
- $V$: Actual content being weighted
- $d_k$: Key/query dimension (scaling factor)

Q, K, V Derivation: $Q = X W_Q$, $K = X W_K$, $V = X W_V$

- $X$: input representation
- $W_Q$, $W_K$, $W_V$: learned weight matrices

The process is same as regular dot-product attention, but with added _scaling_ for stability:

1. Compute $QK^T$ scores (pairwise similarities)
2. Scale by $\sqrt{d_k}$ (prevent gradient instability)
3. Softmax → attention weights (probability distribution)
4. Weighted sum: $weights \times V$

```python
scores = (Q @ K.T) / math.sqrt(d_k)  # Score matrix
weights = F.softmax(scores, dim=-1)  # Attention map
output = weights @ V       # Weighted sum
```

![](https://res.cloudinary.com/dcameztw9/image/upload/v1745306414/scaled%20dot%20product%20attention-76t1gb.webp)

> [!Note]
>
> **Why scaling matters**: Without $\sqrt{d_k}$, dot products grow large as dimensionality increases → softmax gradients vanish. Scaling maintains stable gradients.

**Efficiency**: Pure matrix ops → highly parallelizable (GPU-friendly).
**Drawbacks**: Complexity: O($L^2$) with sequence length (L).

## Related

- [[2 Zettels/multi-head attention\|multi-head attention]] (extension using multiple parallel attention heads)
- [[2 Zettels/self-attention\|self-attention]] (Q, K, V from same input)
- [[2 Zettels/cross-attention\|cross-attention]] (Q from decoder, K, V from encoder)
