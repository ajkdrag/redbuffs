---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/vanilla transformer architecture overview.md","permalink":"/2-zettels/vanilla-transformer-architecture-overview/","PassFrontmatter":true}
---


Topics: [[3 Topics/transformer\|transformer]]
Links:

Transformers use a network architecture that relies on [[attention mechanism\|attention mechanism]] to *weigh the influence of different input parts on each output part*. The original paper designed the architecture as:

![](https://res.cloudinary.com/dcameztw9/image/upload/v1727796616/c39js30sarqj93zeffkd.png)

The key components are:
- [[attention mechanism\|attention mechanism]]: Enables the model to selectively focus on different parts of the input sequence
	- Includes the concept of [[self-attention\|self-attention]] and [[multi-head attention\|multi-head attention]]
- **Parallelization**: Model can process all elements in the sequence simultaneously.
- [[3 Topics/encoder-decoder architecture\|encoder-decoder architecture]]: Model was originally used for seq-seq tasks, e.g. machine translation and has 2 blocks: 
	- [[2 Zettels/transformer encoder block\|transformer encoder block]]
	- [[2 Zettels/transformer decoder block\|transformer decoder block]]
- [[positional encoding\|positional encoding]]: Incorporated to account for the sequential nature of input data.
- [[layer normalization\|layer normalization]]: Normalization technique to stabilize gradients.

Applications: Machine translation, text summarization, NER, Question answering, text generation, chatbots, computer vision and more.
