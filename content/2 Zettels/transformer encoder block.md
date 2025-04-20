---
{"publish":true,"tags":["status/done","type/zettel"],"PassFrontmatter":true,"created":"2024-10-22T15:38:29.101+05:30"}
---


> [!Topics]
> - [[2 Zettels/transformer\|transformer]]

A standard **Transformer encoder block** is a fundamental component of the Transformer's encoder. It takes an input sequence and processes it through 2 main sub-layers, each followed by a [[residual connection\|residual connection]] and [[layer normalization\|layer normalization]] step. The encoder's primary function is to encode input sequences, transforming raw data into context-aware representations. The structure of an encoder block is as follows:

1. [[multi-head self-attention\|multi-head self-attention]]: The input to the encoder block first goes through a [[2 Zettels/multi-head attention\|multi-head attention]] sub-layer. In this [[2 Zettels/self-attention\|self-attention]] mechanism, the queries, keys, and values are all derived from the output of the previous encoder layer (or the input embeddings with positional encoding in the first layer). This allows each position in the input sequence to attend to all other positions, capturing contextual dependencies. A padding mask is typically used to ignore padding tokens (which are used for sequence alignment)

2. **Add & Norm:** A [[residual connection\|residual connection]] is applied around the multi-head attention sub-layer, meaning the original input to the sub-layer is added to its output. This sum is then passed through a [[layer normalization\|layer normalization]] layer, i.e. $x_{out}=\text{LayerNorm}(x + \text{Sublayer}(x))$

3. **Position-wise FFN:** The output of the normalization step is then fed into a [[2 Zettels/position wise feed forward networks\|position wise feed forward networks]] sub-layer (2 linear layers with [[2 Zettels/ReLU activation\|ReLU activation]], dim expansion then compression 512 -> 2048 -> 512).

4. **Second Add & Norm:** Same as step 2, and provides final output for *this* encoder block


The data flow can be summarized as: Input $\rightarrow$ Multi-Head Attention $\rightarrow$ Add & Norm $\rightarrow$ Position-wise FFN $\rightarrow$ Add & Norm $\rightarrow$ Output. The stacking of multiple such encoder layers 
 (6-12x) allows the model to learn increasingly complex representations of the input sequence.

![|360](https://res.cloudinary.com/dcameztw9/image/upload/v1727798563/b0bjims0kfrq4br8yvcx.png)


**Key features**:
- Input: [[2 Zettels/token embedding for sequence models\|token embedding for sequence models]] + [[2 Zettels/encoding sequence position without recurrence\|positional encoding]]
- Parallel processing: Unlike [[RNN\|RNN]]s, encoders process entire sequences simultaneously 
- All sub-layers maintain same dimension

> [!example] Translation
> Encodes `The cat sat on the mat` by: 
> - Embedding words + positional info
> - Computing attention scores to understand relationships (e.g. "sat" -> "cat")
> - Outputs contextual embeddings for the decoder or other downstream tasks
> 

## Related
- [[2 Zettels/transformer decoder block\|transformer decoder block]]
- [[BERT\|BERT]] (encoder-only architecture)
