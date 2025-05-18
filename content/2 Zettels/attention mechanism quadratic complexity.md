---
{"publish":true,"created":"2025-04-23T10:51:54.381+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[matrices\|matrices]]
> - [[2 Zettels/attention mechanism\|attention mechanism]]

Standard attention mechanism has $O(N^2)$ complexity because:

1.  **Time Complexity**: [[2 Zettels/matrix multiplication\|matrix multiplication]] $QK^T$ (dot product between every query vector $Q_i$ and every key vector $K_j$) results in $N \times N$ matrix of similarity scores, which takes $O(N^2d_k)$ FLOPs. Multiplying $N \times N$ attention weight matrix by value matrix $V$ takes $O(N^2d_v)$ time. Overall time complexity is $O(N^2)$, assuming $d_k$​ and $d_v$​ are fixed dimensions independent of $N$

2.  **Memory Complexity**: The $N \times N$ attention score matrix and attention weight matrix ($\text{softmax}(...)$) require $O(N^2)$ memory

This quadratic scaling severely restricts the maximum sequence length $N$ that can be practically processed. For instance, processing sequences longer than a few thousand tokens (as of writing) becomes prohibitively expensive in terms of both computation time and, often _more critically_, memory consumption.

## Related

- [[2 Zettels/linear attention math formulation\|linear attention math formulation]] (reduces complexity to $O(n)$)
