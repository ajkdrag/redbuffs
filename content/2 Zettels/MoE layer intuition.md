---
{"publish":true,"created":"2024-11-18T13:14:08.356+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[mixture of experts\|mixture of experts]]

![](https://res.cloudinary.com/dcameztw9/image/upload/v1731686441/moe-all5th.webp)

In the context of [[2 Zettels/transformer\|transformer]], **Sparse MoE layers** are used instead of dense feed-forward network (FFN) layers. MoE layers have a certain number of "experts" (e.g. 8), where each expert is a neural network. In practice, the experts are FFNs, but they can also be more complex networks or even a MoE itself, leading to *hierarchical* MoEs!

In the diagram, we have the experts $E_1$ through $E_k$ and a gating mechanism aka router. Together they compose one MoE layer. We can stack such layers.
## Related
- [[2 Zettels/sparse vs dense MoEs\|sparse vs dense MoEs]]