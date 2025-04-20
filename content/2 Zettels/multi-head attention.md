---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-16T14:50:04.998+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/attention mechanism\|attention mechanism]]

Multi-Head Attention (MHA) is a core component of the [[2 Zettels/transformer\|transformer]] model, applied in both [[2 Zettels/self-attention\|self-attention]] and [[2 Zettels/cross-attention\|cross-attention]]. Instead of performing attention using full Q, K, V vectors, MHA _splits_ the computation into multiple parallel "heads".

**Mechanim**:

First, input Q, K, V matrices (dimension $d_{model}$) are linearly projected $h$ times using different learned weight matrices:

$$
\begin{align*}
W_i^Q \in \mathbb{R}^{d_{model} \times d_k} \\
W_i^K \in \mathbb{R}^{d_{model} \times d_k} \\
W_i^V \in \mathbb{R}^{d_{model} \times d_v}
\end{align*}
$$

for each head $i=1, \dots, h$. This results in $h$ sets of projected queries ($Q_i = Q W_i^Q$), keys ($K_i = K W_i^K$), and values ($V_i = V W_i^V$). The dimensions $d_k$ and $d_v$ are typically set to $d_{model} / h$.

> [!Note]
> Dims of Key and Query should match for dot product calculation.

Next, the [[2 Zettels/scaled dot product attention\|scaled dot product attention]] function is applied independently and in parallel to each projected set:

$$
\text{head}_i = \text{Attention}(\mathbf{Q}_i, \mathbf{K}_i, \mathbf{V}_i) = \text{softmax}\left(\frac{\mathbf{Q}_i \mathbf{K}_i^T}{\sqrt{d_k}}\right) \mathbf{V}_i
$$

Each $\text{head}_i$ captures attention information from a different projected subspace. Finally, the outputs of the $h$ heads, $\text{head}_1, \dots, \text{head}_h$ (each dimension $d_v$), are concatenated along the feature dimension. This concatenated output (dimension $h \times d_v$) is then passed through a final linear projection layer with a weight matrix $W^O \in \mathbb{R}^{(h d_v) \times d_{model}}$ to produce the final MHA output:

$$
\text{MultiHead}(Q,K,V) = \text{Concat}(\text{head}_1,\dots,\text{head}_h)W^O
$$

This final projection integrates the information learned across the different heads and ensures the output dimension matches the model's expected dimension.

**Pros:**

- Allows model jointly attend to information from different representation subspaces/positions
- Multiple heads can specialize capturing different dependency types (local vs global, syntactic vs semantic)
- Facilitates parallel computation across heads

**Cons:**

- Head redundancy ("attention collapse"): Multiple heads learn similar functions/patterns
- Not all heads contribute equally, some might be prunable
- True specialization across all heads not guaranteed

> [!Note]
> Research explores methods encouraging diversity among heads, e.g., regularization or dynamic head selection like Mixture-of-Head attention.

## Related
