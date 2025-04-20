---
{"publish":true,"tags":["type/zettel","status/done"],"aliases":["soft attention"],"PassFrontmatter":true,"created":"2025-04-19T10:40:25.942+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/attention mechanism\|attention mechanism]]

Contrast to [[2 Zettels/local attention\|local attention]], global attention mechanism allows each query token **attend** to **every token** in input sequence.

Mechanism w.r.t the [[2 Zettels/key-query-value KQV framework\|key-query-value KQV framework]]:

- Query $Q(t)$ at position $t$ computes attention scores vs _all_ keys $K(j)$ for $j=1, \dots, n$
- Context vector $c_t$ is weighted sum of _all_ value vectors $V(j)$
- **Examples**: original [[2 Zettels/bahdanau attention\|bahdanau attention]] (used [[RNN\|RNN]] context), [[2 Zettels/transformer\|transformer]] [[2 Zettels/self-attention\|self-attention]]

Computational Complexity:

- Calculating attention scores $O(n^2)$ operations
- Storing attention matrix $O(n^2)$ memory
- Quadratic scaling makes it expensive for very long sequences

Context Capture:

- Strength lies in capturing long-range dependencies
- Provides comprehensive global understanding
- Every token attends every other token
- Beneficial for tasks needing holistic understanding, like [[sequence modeling\|sequence modeling]]

> [!Note]
> Global attention tackled the [[2 Zettels/fixed-length context vector bottleneck\|fixed-length context vector bottleneck]] problem. Allowed model dynamically focus on relevant parts input sequence during translation or sequence generation. Led to improved performance, especially for longer sequences.

## Related

- [[2 Zettels/local attention\|local attention]]
