---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/transformer decoder block.md","permalink":"/2-zettels/transformer-decoder-block/","PassFrontmatter":true}
---



> [!Topics]
> - [[3 Topics/transformer\|transformer]]

Responsible for generating output sequences based on the *encoded inputs* and *previously generated outputs*.

**Structure**:
- Stack of identical layers (typically 6-12)
- Each layer contains:
    - Multi-headed [[masked self-attention\|masked self-attention]] sublayer
    - Multi-headed [[cross-attention\|cross-attention]] sublayer (encoder-decoder attention)
    - Feed-forward network

![|480](https://res.cloudinary.com/dcameztw9/image/upload/v1727800255/yrmisfizk8xg50twe9rw.png)

**Key features**:
- [[auto-regressive property\|auto-regressive property]]: Generates outputs sequentially, one element at a time.
- [[masked self-attention\|masked self-attention]]: Prevents *attending* to future positions, maintaining the auto-regressive property. 
	- During training, we have access to future generations as well, but by masking those indices, we prevent the model from *cheating*.
- [[cross-attention\|cross-attention]]: Allows the decoder to focus on relevant parts of the encoded inputs.

> [!example]
> In machine translation, for translating `The cat sat on the mat` to French:
> - Decoder first outputs `Le` based on the encoded input English sentence
> - Embed previous outputs (`Le` in this case) along with [[positional encoding\|positional encoding]]
> - Use masked self-attention to *focus* on relevant outputs so far
> - Use cross attention to *focus* on relevant encoded inputs (from encoder block)
> - Generates `chat` considering all prev outputs (`Le`) and the encoded inputs
> - Generation continues until `eos` (end of sentence) token

## Related
- [[2 Zettels/transformer encoder block\|transformer encoder block]]
- [[3 Topics/GPT\|GPT]]
