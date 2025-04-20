---
{"publish":true,"tags":["status/done","type/zettel"],"PassFrontmatter":true,"created":"2025-04-19T18:13:29.213+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/attention mechanism\|attention mechanism]]

Self-attention is a variant of the [[2 Zettels/attention mechanism\|attention mechanism]] where queries, keys, and values ([[2 Zettels/key-query-value KQV framework\|key-query-value KQV framework]]) are all derived from the _same_ input sequence. This contrasts with [[2 Zettels/cross-attention\|cross-attention]] where queries come from one sequence and keys/values from another.

**Core idea**: Each element in a sequence attends to all other elements within that _same_ sequence. This allows the model to capture dependencies between any two positions in the input, regardless of their distance.

> [!Examples]
>
> - [[2 Zettels/transformer\|transformer]] encoder: Allows every word to attend to every other word
> - [[BERT\|BERT]]: Uses self-attention for learning contextual word embeddings
> - [[vision transformer\|vision transformer]] (ViT): Apply self-attention across image patches

Self-attention, like any standard dot product attention, can be **global** or **local**. [[2 Zettels/global attention\|global attention]] (standard [[2 Zettels/transformer\|transformer]]) means each position attends to all others. [[2 Zettels/local attention\|local attention]] (e.g., [[swin transformer\|swin transformer]], [[longformer\|longformer]]) restricts attention to a neighborhood or window for efficiency.

> [!Note]
>
> The output of a self-attention layer is typically a sequence of the _same length_ as the input, where each element's representation is now _enriched_ with contextual information from other relevant elements in the sequence.

## Related

- [[2 Zettels/cross-attention\|cross-attention]] (attending between different sequences)
- [[masked self-attention\|masked self-attention]] (masking of future positions in autoregressive models)
- [[multi-head self-attention\|multi-head self-attention]] (multiple attention heads for capturing different types of dependencies)
