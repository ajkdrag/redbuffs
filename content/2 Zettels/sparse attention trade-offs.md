---
{"publish":true,"created":"2025-04-22T02:13:13.122+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/sparse attention\|sparse attention]]

Implementing sparse attention involves key trade-offs:

- **Efficiency vs. Accuracy:** An important trade-off. Reducing computations by ignoring some query-key interactions might lead to information loss and degrade model performance compared to full attention. The challenge is to design sparse patterns that preserve the most critical information for the task
- **Hardware Efficiency:** Achieving wall-clock speedup requires more than just reducing theoretical FLOPs. _Irregular memory access patterns_ inherent in some sparse methods can underutilize GPU parallelism. Block-sparse patterns (used in [[bigbird\|bigbird]] and Block-Sparse [[flash attention\|flash attention]]) are often more amenable to hardware optimization
- **Training Strategy:** Applying sparsity only during inference to a model trained with full attention can degrade performance. Training the model with sparsity from the start is often necessary, e.g. in Natively Trainable Sparse Attention (NSA)

## Related
