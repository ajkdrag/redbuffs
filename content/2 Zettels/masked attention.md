---
{"publish":true,"created":"2025-04-21T14:47:19.814+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/attention mechanism\|attention mechanism]]
> - [[seq2seq modeling\|seq2seq modeling]]

Masked attention is a _modification_ of the standard [[2 Zettels/attention mechanism\|attention mechanism]] used primarily in sequence generation tasks. It ensures that when computing the output for a position in a sequence, the model can only attend to previous positions and the current position, and not future ones.

This is crucial for [[2 Zettels/auto-regressive property\|autoregressive models]] where each output token depends only on the preceding tokens. Without masking, the model could "cheat" by looking at the target output sequence it is trying to predict.

Implementation involves adding a mask matrix to the raw attention scores (often computed as the dot product of Query and Key matrices, $Q K^T$) _before_ applying the softmax function.

- The mask matrix typically has values of zero in positions corresponding to allowed connections (past and current positions)
- It has very large negative values (like $-\infty$) in positions corresponding to disallowed connections (future positions)

When the [[softmax\|softmax]] function is applied after adding the mask, the large negative values result in attention weights close to zero for the masked positions. This effectively prevents the model from attending to those future elements.

$$
\text{Attention}(Q, K, V) = \text{Softmax}\left(\frac{QK^T}{\sqrt{d_k}} + \text{Mask}\right) V
$$

where the Mask has $-\infty$ values for future positions. For sequence length 3, mask:

$$
\begin{bmatrix}
0 & -\infty & -\infty \\
0 & 0 & -\infty \\
0 & 0 & 0
\end{bmatrix}
$$

This mechanism is a core component in the decoder part of the [[2 Zettels/transformer\|transformer]] architecture, enabling it to generate sequences one element at a time based on previously generated output.

> [!Note]
> Masked attention is often referred to as "causal attention" because it enforces causality, meaning the output at a time step $t$ depends only on inputs from time steps $\le t$.
