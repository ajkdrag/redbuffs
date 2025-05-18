---
{"publish":true,"created":"2024-11-19T16:12:27.456+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[mixture of experts\|mixture of experts]]
> - [[sparse models\|sparse models]]

Sparse and Dense MoEs are basically similar in many aspects. The main difference is during [[2 Zettels/token routing\|token routing]], where sparse only activates top-k experts per token (with k being 1 or 2), whereas *in dense, all experts process each token*. This effectively results in different computation costs and latencies. Nowadays, when we say MoE, we usually are talking about the sparse variant. 

The motivation behind prsuing research in the direction of sparsity ⎯ scaling sparse params with fixed computation budget per example is independently useful since:
- **Scaling laws**: larger MoEs -> better [[2 Zettels/sample efficiency\|sample efficiency]]
- **Sparsity**: faster processing, since we are skipping certain params

> Some modern architectures have variable sparsity via dynamic expert selection.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1732458582/sparse%20vs%20dense%20MoEs-2ce4in.webp)



## Related
- [[2 Zettels/popular MoE models\|popular MoE models]]