---
{"publish":true,"tags":["status/done","type/zettel"],"PassFrontmatter":true,"created":"2024-10-22T15:38:33.498+05:30"}
---


> [!Note] Topics
> [[neural network architectures\|neural network architectures]]

Encoder-decoder architectures handle variable-length input/output sequences, making them suitable for [[seq2seq modeling\|seq2seq modeling]] tasks like machine translation. The encoder compresses input into a fixed-shape representation (memory), while the decoder generates output from this memory.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1729777337/encoder-decoder%20architecture-xy18od.webp)

In [[2 Zettels/transformer\|transformer]] (a specific implementation), both components are stacks of identical layers. The encoder processes the full input using [[2 Zettels/self-attention\|self-attention]] and produces contextualized representations. The decoder generates output [[2 Zettels/auto-regressive property\|autoregressively]] using [[masked self-attention\|masked self-attention]] (for past tokens) and [[2 Zettels/cross-attention\|cross-attention]] (to reference encoder memory).

The architecture isn't limited to sequence tasks - [[variational autoencoder\|variational autoencoder]] uses it for image generation. The separation of encoding/decoding allows handling varying sequence lengths and complexities.

## Related
