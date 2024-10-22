---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/encoder-decoder architecture boilerplate pytorch.md","permalink":"/2-zettels/encoder-decoder-architecture-boilerplate-pytorch/","PassFrontmatter":true}
---



> [!Topics]
> - [[3 Topics/encoder-decoder architecture\|encoder-decoder architecture]]

The encoder takes variable-length sequences as input `X`. The implementation will be provided by any model that inherits this base `Encoder` class.

```python
class Encoder(nn.Module):
    """The base encoder interface for the encoder-decoder architecture."""
    def __init__(self):
        super().__init__()

    # Later there can be additional arguments (e.g., length excluding padding)
    def forward(self, X, *args):
        raise NotImplementedError
```

The decoder interface has an additional `init_state` method to convert the encoder output (`enc_all_outputs`) into the encoded state.

> To generate a variable-length sequence token by token, every time the decoder may map an input (e.g., the generated token at the previous time step) and the encoded state into an output token at the current time step.

```python
class Decoder(nn.Module):
    """The base decoder interface for the encoder-decoder architecture."""
    def __init__(self):
        super().__init__()

    # Later there can be additional arguments (e.g., length excluding padding)
    def init_state(self, enc_all_outputs, *args):
        raise NotImplementedError

    def forward(self, X, state):
        raise NotImplementedError
```

Putting the base classes together, we have:

```python
class EncoderDecoder(nn.Module):  
    """The base class for the encoder--decoder architecture."""
    def __init__(self, encoder, decoder):
        super().__init__()
        self.encoder = encoder
        self.decoder = decoder

    def forward(self, enc_X, dec_X, *args):
        enc_all_outputs = self.encoder(enc_X, *args)
        dec_state = self.decoder.init_state(enc_all_outputs, *args)
        # Return decoder output only
        return self.decoder(dec_X, dec_state)[0]
```

## Related
