---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[mixture of experts\|mixture of experts]]
> - [[sparse models\|sparse models]]

Sparse and Dense MoEs are basically similar in many aspects. The main difference is during [[2 Zettels/token routing\|token routing]], where sparse only activates top-k experts per token (with k being 1 or 2), whereas *in dense, all experts process each token*. This effectively results in different computation costs and latencies. Nowadays, when we say MoE, we usually are talking about the sparse variant. 

> Some modern architectures have variable sparsity via dynamic expert selection.

## Related
- [[2 Zettels/popular MoE models\|popular MoE models]]