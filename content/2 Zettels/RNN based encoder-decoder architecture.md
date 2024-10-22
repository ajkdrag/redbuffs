---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/RNN based encoder-decoder architecture.md","permalink":"/2-zettels/rnn-based-encoder-decoder-architecture/","PassFrontmatter":true}
---



> [!Topics]
> - [[3 Topics/encoder-decoder architecture\|encoder-decoder architecture]]

In a typical [[RNN\|RNN]] based implementation, say for language translation task, the
encoder encodes input at each timestep, and the encoded output at final timestep, becomes the input to the decoder. The decoder's hidden state is initialized with this encoded output and `bos` (beginning of sentence) token is input at first time step. At each timestep, it takes previous generation as input along with the hidden state and keeps on generating until `eos` (end of sentence) token is generated.

## Related
- [[2 Zettels/encoder-decoder architecture formally defined\|encoder-decoder architecture formally defined]]
