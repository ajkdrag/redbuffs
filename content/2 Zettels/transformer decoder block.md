---
{"publish":true,"tags":["status/done","type/zettel"],"PassFrontmatter":true,"created":"2024-10-22T15:38:28.702+05:30"}
---


> [!Topics]
> - [[2 Zettels/transformer\|transformer]]

A **Transformer decoder block** is a key component of the Transformer's decoder, responsible for generating the output sequence. Similar to the encoder, the decoder consists of a stack of identical layers. Each decoder layer has 3 main sub-layers, each followed by a [[residual connection\|residual connection]] and [[layer normalization\|layer normalization]] step. Primary job is to generate output sequences based on the *encoded inputs* and *previously generated outputs*. The structure is:

1.  [[masked multi-head self-attention\|masked multi-head self-attention]]: The mask prevents the decoder from attending to subsequent tokens in the target sequence, ensuring that the prediction for the current position only depends on the tokens generated so far. This is essential for [[2 Zettels/auto-regressive property\|auto-regressive property]]. Padding masks are also used here
2.  **Add & Norm:** A [[residual connection\|residual connection]] and [[layer normalization\|layer normalization]] are applied around the masked multi-head self-attention sub-layer
3.  **Encoder-Decoder Multi-Head Attention:** The second sub-layer is another [[2 Zettels/multi-head attention\|multi-head attention]] mechanism, but this time, the queries ($Q$) come from the output of the previous decoder sub-layer, while the keys ($K$) and values ($V$) come from the output of the final [[2 Zettels/transformer encoder block\|transformer encoder block]] (often referred to as the "memory"). This type of attention is also called as [[2 Zettels/cross-attention\|cross-attention]]. It allows the decoder to attend to the encoded input sequence and draw relevant information for generating the target sequence. Padding masks for the encoder output are applied here.
4.  **Second Add & Norm:** Another residual connection and layer normalization are applied around the encoder-decoder attention sub-layer.
5.  **Position-wise Feed-Forward Network:** The third sub-layer is a [[2 Zettels/position wise feed forward networks\|position wise feed forward networks]], identical in structure to the one in the encoder (2 linear layer + [[2 Zettels/ReLU activation\|ReLU activation]])
6.  **Third Add & Norm:** A final residual connection and layer normalization are applied around the position-wise feed-forward network

The data flow in a decoder layer is: Input $\rightarrow$ Masked Multi-Head Self-Attention $\rightarrow$ Add & Norm $\rightarrow$ Encoder-Decoder Multi-Head Attention $\rightarrow$ Add & Norm $\rightarrow$ Position-wise FFN $\rightarrow$ Add & Norm $\rightarrow$ Output.

![|480](https://res.cloudinary.com/dcameztw9/image/upload/v1727800255/yrmisfizk8xg50twe9rw.png)

**Key features**:
- Input: [[2 Zettels/token embedding for sequence models\|token embedding for sequence models]] + [[2 Zettels/encoding sequence position without recurrence\|positional encoding]] (for the output generated so far)
- applies [[2 Zettels/teacher forcing\|teacher forcing]] during training
- [[masked multi-head self-attention\|masked multi-head self-attention]]: Prevents *attending* to future positions, maintaining the [[2 Zettels/auto-regressive property\|auto-regressive property]]. 
	- During training, we have access to future generations as well, but by masking those indices, we prevent the model from *cheating*
- [[2 Zettels/cross-attention\|cross-attention]]: Allows the decoder to focus on relevant parts of the encoded inputs.

> [!example]
> In machine translation, for translating `The cat sat on the mat` to French:
> - Decoder first outputs `Le` based on the encoded input English sentence
> - Embed previous outputs (`Le` in this case) along with [[positional encoding\|positional encoding]]
> - Use masked self-attention to *focus* on relevant *outputs so far*
> - Use cross attention to *focus* on relevant *encoded inputs* (from encoder block)
> - Generates `chat` considering all prev outputs (`Le`) and the encoded inputs
> - Generation continues until `eos` (end of sentence) token

## Related
- [[2 Zettels/transformer encoder block\|transformer encoder block]]
- [[GPT\|GPT]] (decoder-only architecture)
