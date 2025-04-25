---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-21T15:16:22.633+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/attention mechanism\|attention mechanism]]

Masked self-attention combines two key ideas:

1. [[2 Zettels/self-attention\|self-attention]] mechanism where Q, K, V come from same sequence
2. [[2 Zettels/masked attention\|masked attention]] that prevents attending to future positions

This combination is primarily used in [[autoregressive models\|autoregressive models]], e.g. [[2 Zettels/transformer decoder block\|transformer decoder block]]. Unlike standard self-attention which allows full bidirectional context, masked self-attention enforces _causality_ - each position can only attend to previous positions and itself.

This is achieved by applying a [[2 Zettels/causal mask vs padding mask\|causal mask]] during the attention calculation. The mask sets the attention scores for future positions to a very low value (typically negative infinity before the softmax), effectively zeroing them out in the final attention distribution.

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}} + M\right)V
$$

where $M$ is the causal mask with $M_{ij} = -\infty$ when $i < j$.

> Since it's *self*-attention, the masking prevents attending to future positions *within the same sequence* being processed.

## Related

- [[2 Zettels/masked multi-head self-attention\|masked multi-head self-attention]]
