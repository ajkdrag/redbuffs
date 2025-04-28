---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-19T10:26:41.145+05:30"}
---


> [!Topics]
>
> - [[neural information retrieval\|neural information retrieval]]

Key-Query-Value (K-Q-V) framework generalizes [[2 Zettels/attention mechanism\|attention mechanism]]. Framework computes output by mapping query (Q) vector and set of key (K) / value (V) vector pairs.

- Query represents what model looks for.
- Keys represent information available in input elements.
- Values represent content to retrieve.

> [!Example]
> Searching papers on ArXiv: The query is ideally what you will put in the search box. Internally, ArXiv may organize papers by a set of predefined keys. It will compare your query to those predefined set of keys and return papers that best match with query and keys correspondence. Values merely refers to all papers in the database. Note that it's not an attempt to show how ArXiv system works

Output calculated as weighted sum of value vectors. Weight for each value is determined by _compatibility function_ (usually dot product) between query and corresponding key. This gives us an initial weights or "scores". To normalize, [[softmax\|softmax]] is typically applied on these scores, to obtain final attention weights.

Simply consider the following: denote by $\mathcal{D} \stackrel{\textrm{def}}{=} \{(\mathbf{k}_1, \mathbf{v}_{1),}\ldots (\mathbf{k}_m, \mathbf{v}_m)\}$ a database of tuples of keys and values. Moreover, denote by $\mathbf{q}$ a query. Then we can define the attention over $\mathcal{D}$ as

$$
\textrm{Attention}(\mathbf{q}, \mathcal{D}) \stackrel{\textrm{def}}{=} \sum_{i=1}^m \alpha(\mathbf{q}, \mathbf{k}_i) \mathbf{v}_i
$$

where $\alpha(\mathbf{q}, \mathbf{k}_i) \in \mathbb{R}\;, i = 1, \ldots, m$ are scalar attention weights. This is typically referred to as **attention pooling**.

K-Q-V framework instrumental in developing [[2 Zettels/self-attention\|self-attention]] (intra-attention). In self-attention, queries, keys, and values derived from same input sequence. This allows models capture internal dependencies within sequence without relying on recurrence like [[RNN\|RNN]]s.

Transition from RNN-specific attention mechanisms to generalized K-Q-V framework and self-attention represents fundamental shift in [[sequence modeling\|sequence modeling]]. Moves from inherently sequential processing to architectures centered around parallelizable attention computations, such as the [[2 Zettels/transformer\|transformer]] (which completely removed recurrence and performed better).

## Related
