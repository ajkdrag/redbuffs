---
{"publish":true,"created":"2025-04-22T01:04:03.311+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/attention mechanism\|attention mechanism]]
> - [[sparse models\|sparse models]]
> - [[optimization\|optimization]]

Sparse attention methods modify the standard [[2 Zettels/self-attention\|self-attention]] mechanism to improve computational efficiency. Standard self-attention has a quadratic complexity $O(n^2)$ with respect to sequence length $n$. Sparse attention aims to reduce this cost.

The core idea is to restrict each query token to attend to only a _subset_ of key tokens, rather than all $n$ keys. If each query attends to a fixed small number of $k$ keys, the complexity can be reduced to $(n\cdot k)$. This is much more efficient when $k \ll n$. The motivation often comes from observing that in vanilla attention, many query-key interactions have very small weights and contribute little to the final output; these can potentially be ignored. There are various techniques for achieving sparsity.

### Fixed Patterns

These methods use predefined, static patterns to determine which keys each query attends to.

- [[2 Zettels/local attention\|local attention]], [[sliding window attention\|sliding window attention]]: Attending only to nearby tokens
- [[strided window attention\|strided window attention]]: Attending to tokens at fixed intervals (strides) to increase receptive field without increasing density, e.g. [[longformer\|longformer]]
- **Global Tokens:** Designates a few $m \ll n$ tokens (e.g., `[CLS]` token in classification) that can attend globally, combined with other sparse patterns, e.g [[bigbird\|bigbird]], [[longformer\|longformer]]
- **Block Patterns:** Split the sequence into blocks of size `b`. Within‑block: full attention, somewhat seen in [[swin transformer\|swin transformer]]

### Content-Based / Learnable Patterns:

Sparsity patterns are determined dynamically based on the input sequence content.

- [[locality sensitive hashing\|locality sensitive hashing]]: Uses hashing to group similar queries and keys into buckets, restricting attention computation within buckets. Employed by [[reformer\|reformer]]
- **Clustering:** Models like [[routing transformer\|routing transformer]] uses online [[k-means clustering\|k-means clustering]] of token representations: queries attend only to keys in the same cluster. Another strat is to group queries and compute attention only with cluster _centroids_ (e.g., [[clustered attention\|clustered attention]])
- **Learnable Positions:** The model learns which positions are most relevant to attend to (e.g., A2-Former, Sparsefinder)
- **Top-k Selection:** Selects a constant number $k$ of the highest-scoring keys for each query (e.g., SparseK Attention). Requires differentiable top-k operators for training
- **Adaptive Patterns**: Dynamically adjust the sparsity pattern and/or computational budget based on the input characteristics or attention head needs (e.g., FlexPrefill, Mixture of Attention (MoA))

> Fixed patterns are simpler but potentially suboptimal. Learnable or adaptive patterns offer more flexibility but increase model complexity and may require sophisticated training procedures

### Random Patterns

Each query attends to a randomly selected set of keys. This helps ensure some global context while maintaining sparsity. Used as a component in [[bigbird\|bigbird]] to facilitate information flow.

### Hierarchical Methods

**Tree based view:** Applied on the input tokens and _restrict attention_ based on parent-child-sibling relationships (e.g., Sparse Transformer, Sequoia). Natively Trainable Sparse Attention (NSA) uses hierarchical token modeling with compressed coarse-grained tokens, fine-grained tokens, and sliding windows.

**Graph-Based View**: Perceives tokens as nodes and the attention mask as edges, applying [[graph algorithms\|graph algorithms]] for efficient computation.

> These sparsity techinques discussed can also be mixed together: e.g:
>
> - BigBird's block + random + global
> - strided + block patterns: full attention within block and between blocks attend only to every $s$-th block or token.

## Related

- [[2 Zettels/hard vs sparse vs soft attention\|hard vs sparse vs soft attention]]
- [[2 Zettels/sparse attention trade-offs\|sparse attention trade-offs]]
