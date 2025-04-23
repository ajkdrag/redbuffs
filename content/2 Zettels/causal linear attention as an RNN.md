---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-23T14:42:14.526+05:30"}
---


> [!Topics]
>
> - [[linear attention\|linear attention]]

Causal linear attention can be expressed as an [[RNN\|RNN]]. This applies when a token at position $t$ only attends to tokens at positions $j \le t$.

This formulation, shown by Katharopoulos et al. (2020), defines state at time $t$ using accumulated key-value (context) summary $S_t$ and accumulated key summary $Z_t$:

$$
\begin{align*}
S_t &= \sum_{j=1}^t \phi(K_j)^T V_j \in \mathbb{R}^{c \times d_v}\\
Z_t &= \sum_{j=1}^t \phi(K_j)^T \in \mathbb{R}^{c}
\end{align*}
$$

For more details on notation, refer [[2 Zettels/linear attention math formulation\|linear attention math formulation]]. Cool observation is that these states update _recurrently_:

$$
\begin{align*}
S_t &= S_{t-1} + \phi(K_t)^T V_t \quad &(S_0 = 0) \\
Z_t &= Z_{t-1} + \phi(K_t)^T \quad &(Z_0 = 0)
\end{align*}
$$

Output at time $t$ computed using current query $\phi(Q_t)$ and updated state $(S_t, Z_t)$:

$$
\text{Output}_t^{1\times d_v} \approx \frac{ \phi(Q_t) S_t}{ \phi(Q_t) Z_t}
$$

Standard [[2 Zettels/masked attention\|causal attention]] with [[kv-caching\|kv-caching]] (storing all previous keys/values) needs $O(N)$ memory. Causal linear attention with RNN formulation only needs $O(1)$ memory (specifically $O(cd_v​+c))$ per step during inference) for fixed-size states $(S_t, Z_t)$, making it efficient for long sequences.

## Related
