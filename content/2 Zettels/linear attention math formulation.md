---
{"publish":true,"created":"2025-04-23T11:29:59.407+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[linear attention\|linear attention]]
> - [[linear algebra\|linear algebra]]

Linear attention reduces computational complexity standard attention from $O(N^2 d)$ to $O(N d)$ using kernelization and associative [[2 Zettels/matrix multiplication\|matrix multiplication]].

Standard [[2 Zettels/scaled dot product attention\|scaled dot product attention]] output for query $Q_i$:

$$
\text{Output}_i^{1\times d_v} = \frac{\sum_{j=1}^{N} \exp\left(\frac{Q_i K_j^T}{\sqrt{d_k}}\right) V_j}{\sum_{j=1}^{N} \exp\left(\frac{Q_i K_j^T}{\sqrt{d_k}}\right)}
$$

$Q_i, K_j$ row vectors ($1 \times d_k$), $V_j$ row vector ($1 \times d_v$), Output$_i$ row vector ($1 \times d_v$). $Q_i K_j^T$ is scalar dot product.

We can generalize (dot prod and softmax combo) using a similarity function $\text{sim}(Q_i, K_j)$:

$$
\text{Output}_i = \frac{\sum_{j=1}^{N} \text{sim}(Q_i, K_j) V_j}{\sum_{j=1}^{N} \text{sim}(Q_i, K_j)}
$$

Linear attention **approximates this similarity function** using kernel decomposed by [[2 Zettels/choice of feature map in linear attention\|feature maps]] $\phi: \mathbb{R}^{d_k} \rightarrow \mathbb{R}^{c}$. $\phi$ maps $1 \times d_k$ row vector to $1 \times c$ row vector.

$$
\text{sim}(Q_i, K_j) \approx \phi(Q_i) \phi(K_j)^T
$$

Substitute into generalized attention:

$$
\text{Output}_i \approx \frac{\sum_{j=1}^{N} (\phi(Q_i) \phi(K_j)^T) V_j}{\sum_{j=1}^{N} \phi(Q_i) \phi(K_j)^T}
$$

Using the linearity of dot product and the associative property of mat mul:

$$
\boxed{\text{Output}_i \approx \frac{\phi(Q_i) \left( \sum_{j=1}^{N} \phi(K_j)^T V_j \right)}{\phi(Q_i) \left( \sum_{j=1}^{N} \phi(K_j)^T \right)}}
$$

where:

- $\phi(Q_i)$ is $1 \times c$ row vector
- $\phi(K_j)^T$ is $c \times 1$ column vector
- $V_j$ is $1 \times d_v$ row vector
- Sum $\sum_{j=1}^{N} \phi(K_j)^T V_j$ is $c \times d_v$ matrix. Also called as **context summary matrix**
- Sum $\sum_{j=1}^{N} \phi(K_j)^T$ is $c \times 1$ column vector

> [!Note]
>
> The terms $\sum_{j=1}^{N} \phi(K_j)^T V_j$ (context-summary) and $\sum_{j=1}^{N} \phi(K_j)^T$ (key-summary) are pre-computable.

**Vectorized form** (efficient) with $\phi(Q) \in \mathbb{R}^{N \times c}$, $\phi(K) \in \mathbb{R}^{N \times c}$, and $V \in \mathbb{R}^{N \times d_v}$:

- Global key-value (context) summary: $S = \phi(K)^T V \in \mathbb{R}^{c \times d_v}$
- Global key summary: $Z = \sum_{j=1}^{N} \phi(K_j) = \phi(K)^T \mathbf{1}_N \in \mathbb{R}^{c}$, where $\mathbf{1}_N$ is a column vector of ones
- Numerator: $\text{Numerator} = \phi(Q) S \in \mathbb{R}^{N \times d_v}$
- Denominator (normalization term): $\text{Denominator} = \phi(Q) Z \in \mathbb{R}^{N}$
- Output: $\text{Output} \approx \text{Numerator} / \text{Denominator}' \in \mathbb{R}^{N \times d_v}$, where $/$ is element-wise division and $\text{Denominator}'$ is broadcasted.

$$
\boxed{
\text{VecOutput} \approx \frac{\phi(Q) \phi(K)^T V}{\phi(Q) \phi(K)^T \mathbf{1}_N}
}
$$

### Complexity Analysis

- Computing $\phi(Q)$ and $\phi(K)$: $O(N c d_k)$ or $O(N c)$ depending on $\phi$
- Computing $S = \phi(K)^T V$: requires $O(N c d_v)$ time
- Computing $Z = \phi(K)^T \mathbf{1}_N$: requires $O(N c)$ time
- Computing Numerator: $O(N c d_v)$
- Computing Denominator: $O(N c)$
- Final element-wise division: $O(N d_v)$

**Time complexity:** $\approx O(N (c d_v + c))$. If $c$ and $d_v$ are constant with respect to $N$, the complexity is $O(N)$.

**Space complexity:** Determined by the need to store $\phi(Q), \phi(K), S, Z, \text{Output}$, which requires $O(N c + c d_v + c + N d_v) \approx O(N)$ if $c$ and $d_v$ are constant.

## Related
