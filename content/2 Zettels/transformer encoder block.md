---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/transformer encoder block.md","permalink":"/2-zettels/transformer-encoder-block/","PassFrontmatter":true}
---


Topics: [[3 Topics/transformer\|transformer]]
Links: [[2 Zettels/transformer decoder block\|transformer decoder block]] | [[BERT\|BERT]]

Vanilla transformers have the Encoder and the Decoder blocks. Both elements harness the power of [[self-attention\|self-attention]] mechanisms to intricately process data, significantly enhancing the model's proficiency in handling sequential information. The encoder's primary function is to encode input sequences, transforming raw data into context-aware representations.

**Structure**:
- Stack of identical layers (typically 6-12)
- Each layer contains (with [[residual connections\|residual connections]]):
    - [[multi-head attention\|multi-head attention]] sublayer
    - Feed-forward network

![|360](https://res.cloudinary.com/dcameztw9/image/upload/v1727798563/b0bjims0kfrq4br8yvcx.png)


**Key features**:
- Parallel processing: Unlike [[RNN\|RNN]]s, encoders process entire sequences simultaneously, improving efficiency.
- Context awareness: Self-attention allows each token to attend to all other tokens, capturing long-range dependencies.
- [[positional encoding\|positional encoding]] is added to input embeddings to retain sequence order information.

> [!example]
> In machine translation, the encoder might process the sentence `The cat sat on the mat` by: 
> - Embedding each word
> - Applying positional encoding
> - Using self-attention to understand relationships (e.g., "sat" relates to "cat")
> - Passing through feed-forward layers for further processing
> 
> The output of the encoder is a series of context-rich representations that can be used by a [[2 Zettels/transformer decoder block\|transformer decoder block]] or for other downstream tasks.