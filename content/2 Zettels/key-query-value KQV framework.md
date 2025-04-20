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

Output calculated as weighted sum of value vectors. Weight for each value determined by _compatibility function_ (usually dot product) between query and corresponding key. [[softmax\|softmax]] typically applied on these score to obtain normalized attention weights.

K-Q-V framework instrumental in developing [[2 Zettels/self-attention\|self-attention]] (intra-attention). In self-attention, queries, keys, and values derived from same input sequence. This allows models capture internal dependencies within sequence without relying on recurrence like [[RNN\|RNN]]s.

Transition from RNN-specific attention mechanisms to generalized K-Q-V framework and self-attention represents fundamental shift in [[sequence modeling\|sequence modeling]]. Moves from inherently sequential processing to architectures centered around parallelizable attention computations, such as the [[2 Zettels/transformer\|transformer]] (which completely removed recurrence and performed better).

## Related
