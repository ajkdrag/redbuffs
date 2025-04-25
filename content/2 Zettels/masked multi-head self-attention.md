---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-24T13:29:17.459+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/masked attention\|masked attention]]
> - [[2 Zettels/self-attention\|self-attention]]
> - [[2 Zettels/multi-head attention\|multi-head attention]]

Masked multi-head self-attention is an [[2 Zettels/attention mechanism\|attention mechanism]] variant that combines:

- masking from [[2 Zettels/masked attention\|masked attention]] to prevent info leakage
- multiple attention heads from [[2 Zettels/multi-head attention\|multi-head attention]] to learn different relationships
- [[2 Zettels/self-attention\|self-attention]] to process sequence elements relative to each other

Used in [[decoder-only transformers\|decoder-only transformers]] like [[GPT\|GPT]] or decoder part of [[2 Zettels/transformer\|transformer]] architecture.

Typical process:

1. For each _head_, compute query, key, value matrices
2. Apply [[2 Zettels/causal mask vs padding mask\|causal mask]] to prevent attending to future positions
3. Compute [[2 Zettels/scaled dot product attention\|scaled dot product attention]] per head
4. _Concatenate_ all head outputs and linearly project to obtain result for the layer

## Related
