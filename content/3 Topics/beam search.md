---
{"publish":true,"tags":["status/done","type/topic"],"path":"3 Topics/beam search.md","permalink":"/3-topics/beam-search/","PassFrontmatter":true}
---



> [!Topics]
> - [[decoding strategies\|decoding strategies]]

A heuristic search algorithm used in sequence generation tasks, such as machine translation or text generation. It provides a trade-off between accuracy and computational cost via the flexible choice of the beam size. E.g. with $\beta=2$, we only keep the first and the second probable sequence at each step and finally pick the sequence that maximizes: 
$$
\frac{1}{L^\alpha} \sum_{t=1}^L \log P(\hat{y}_{t} \mid \hat{y}_1, \ldots, \hat{y}_{t-1}, \mathbf{c})
$$
Beam search will always find an output sequence with higher probability than greedy search, but is not guaranteed to find the most likely output.

## Related
- [[3 Topics/greedy decoding\|greedy decoding]]
- [[exhaustive search\|exhaustive search]]
- [[contrastive search\|contrastive search]]
