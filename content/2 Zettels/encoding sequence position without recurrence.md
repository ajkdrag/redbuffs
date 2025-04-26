---
{"publish":true,"tags":["type/zettel","status/done"],"aliases":["positional encoding"],"PassFrontmatter":true,"created":"2025-04-16T11:52:11.750+05:30"}
---


> [!Topics]
>
> - [[sequence modeling\|sequence modeling]]

Unlike recurrent neural networks ([[RNN\|RNN]]s) that inherently process sequences in order, the [[2 Zettels/transformer\|transformer]] architecture processes all tokens in parallel. This parallelism offers significant computational advantages but means the model doesn't have a built-in sense of the order of tokens in the sequence. Since the order of words (or other tokens) is crucial for meaning, we need a mechanism to explicitly encode the position of each token.

The original Transformer paper introduced [[sinusoidal positional encoding\|sinusoidal positional encoding]] as a way to address this. This method uses sine and cosine functions of different frequencies to create a unique vector representation for each position in the sequence. The formulas for calculating these positional encodings ($PE$) for a given position $pos$ and dimension $i$ are:

$$PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{model}}}\right)$$

$$PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{model}}}\right)$$

where $pos$ is the position of the token in the sequence (starting from 0), $d_{model}$ is the dimensionality of the embedding vectors, and $i$ ranges from 0 to $d_{model}/2 - 1$. The different frequencies of the sine and cosine functions across the dimensions allow for a _unique_ encoding of each position.

During forward pass, the same position gets the same positional embedding regardless of token. The positional encoding vector is added **element-wise** to the corresponding [[2 Zettels/token embedding for sequence models\|token embedding for sequence models]], allowing the model to jointly reason about both what the token is and where it appears.

While sinusoidal positional encoding is a common choice, other methods exist: [[learned positional embeddings\|learned positional embeddings]] involve learning a separate embedding vector for each position (similar to token embeddings); [[relative positional encoding\|relative positional encoding]] schemes focus on modeling the distance between tokens.

## Related
