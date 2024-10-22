---
{"publish":true,"tags":["status/done","type/topic"],"path":"3 Topics/encoder-decoder architecture.md","permalink":"/3-topics/encoder-decoder-architecture/","PassFrontmatter":true}
---



> Composed of an encoder (which compresses the input) and a decoder (which decompresses the compressed input). 

Encoder-decoder architectures can handle inputs and outputs that both consist of **variable-length sequences** and thus are suitable for sequence-to-sequence problems such as machine translation. The encoder takes a variable-length sequence as input and transforms it into a state with a fixed shape. The decoder maps the encoded state of a fixed shape to a variable-length sequence.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1727957417/wcfzqt7h71o8vufbgi0k.png)

> [!note]
> This architecture is not just used for *sequence transduction* tasks (i.e. language translation, summarization, image captioning etc). Example: [[variational autoencoder\|variational autoencoder]] which is used in computer vision, but has an encoder-decoder architecture.

## Related
- [[seq2seq modelling\|seq2seq modelling]]
