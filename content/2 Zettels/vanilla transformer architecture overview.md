---
{"publish":true,"created":"2024-10-22T15:38:29.267+05:30","tags":["status/done","type/zettel"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/transformer\|transformer]]

The vanilla Transformer architecture introduced in "Attention Is All You Need" paper, was designed to address the limitations of [[limitations of recurrent neural networks in seq2seq modelling\|limitations of recurrent neural networks in seq2seq modelling]], particularly for machine translation. The Transformer achieved state-of-the-art results on WMT 2014 (machine translation benchmark), while requiring significantly less training time than recurrent approaches. Its [[2 Zettels/why was the vanilla transformer architecture impactful\|success]] stems from three key innovations:

1. Complete replacement of recurrence with [[2 Zettels/self-attention\|self-attention]]
2. [[2 Zettels/multi-head attention\|multi-head attention]] allowing different representation subspaces
3. Positional embeddings enabling sequence order awareness

The [[2 Zettels/attention mechanism\|attention mechanism]] *weighs the influence of different input parts on each output part*. The original paper designed the architecture as:

![](https://res.cloudinary.com/dcameztw9/image/upload/v1727796616/c39js30sarqj93zeffkd.png)

It follows the [[2 Zettels/encoder-decoder architecture\|encoder-decoder architecture]], as was originally used for machine translation task. The [[2 Zettels/transformer encoder block\|transformer encoder block]] contains:

- [[multi-head self-attention\|multi-head self-attention]] layer that computes attention weights between all positions
- feed forward layers to increase model capacity
- [[residual connection\|residual connection]] around each sub-layer followed by [[layer normalization\|layer normalization]] (normalization technique to stabilize gradients)

The [[2 Zettels/transformer decoder block\|transformer decoder block]] has similar components but adds:

- [[2 Zettels/masked multi-head self-attention\|masked multi-head self-attention]] (masking to prevent positions from attending to subsequent positions)
- [[2 Zettels/cross-attention\|cross-attention]] (via [[2 Zettels/multi-head attention\|multi-head attention]]) to incorporate the encoder's output: (K, V) come from encoder output, Q comes from decoder

Input processing involves:

- [[2 Zettels/token embedding for sequence models\|token embedding for sequence models]] to convert discrete tokens to continuous vectors
- [[2 Zettels/encoding sequence position without recurrence\|encoding sequence position without recurrence]] via [[sinusoidal positional encoding\|sinusoidal positional encoding]] or [[learned positional embeddings\|learned positional embeddings]]

The architecture's design choices enable several benefits:

- parallel computation across sequence positions
- constant path length between any two positions (vs. $O(n)$ in RNNs)
- direct modeling of long-range dependencies through attention

Plethora of applications: Machine translation, text summarization, NER, Question answering, text generation, chatbots, computer vision and more.

## Related
