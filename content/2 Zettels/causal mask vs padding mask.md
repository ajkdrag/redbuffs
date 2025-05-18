---
{"publish":true,"created":"2025-04-21T15:02:41.905+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/masked attention\|masked attention]]

It is important to distinguish the causal mask from the padding mask:

- **Causal Mask**: Prevents attention to future positions within a sequence. Applied only in decoder [[2 Zettels/self-attention\|self-attention]]. Shape is typically triangular. Purpose is to enforce [[2 Zettels/auto-regressive property\|auto-regressive property]] during training/inference
- **Padding Mask**: Prevents attention to padding tokens added to make sequences in a batch equal length. Can be applied in encoder self-attention, decoder self-attention, and decoder cross-attention _whenever padding is present_. Shape depends on the lengths of sequences in the batch. Purpose is to ignore meaningless padding tokens during computation.

Both are often implemented by adding large negative values before the softmax, but they target different tokens for different reasons. Some libraries combine both masks automatically when provided.

## Related
