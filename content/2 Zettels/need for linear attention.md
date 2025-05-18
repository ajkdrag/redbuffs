---
{"publish":true,"created":"2025-04-23T10:43:34.782+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[linear attention\|linear attention]]

The standard [[2 Zettels/attention mechanism\|attention mechanism]] faces a significant challenge: its computational and memory requirements scale [[2 Zettels/attention mechanism quadratic complexity\|quadratic]] with the length of the input sequence $N$. This $O(N^2)$ complexity represents a major bottleneck, severely limiting the application of standard [[2 Zettels/transformer\|transformer]] model to tasks involving very long sequences.

> [!Note]
> While both time and memory complexity scale as $O(n^2)$, the memory requirement is frequently cited as the more immediate practical bottleneck on modern hardware accelerators like GPUs (limited High-Bandwidth Memory aka HBM).

To overcome this critical limitation, a class of efficient attention mechanisms known as **Linear Attention** has emerged, to circumvent the quadratic bottleneck by _approximating_ or _reformulating_ the standard attention computation to achieve linear, $O(N)$, or near-linear time and memory complexity.

The fundamental strategy is to avoid the explicit computation and materialization of the full $N\times N$ attention matrix. This is typically achieved by altering the order of operations in the attention calculation, often by leveraging mathematical properties such as **kernel functions** and the associative property of [[2 Zettels/matrix multiplication\|matrix multiplication]].

## Related
