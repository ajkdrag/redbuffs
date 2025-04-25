---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-25T01:16:05.416+05:30"}
---


> [!Topics]
>
> - [[tokenization\|tokenization]]

Character-based tokenization converts text to tokens at character level. Each Unicode **character** becomes separate token. Simple but has tradeoffs.

> [!Note]
>
> The unit of compression rate is "bytes/token", i.e., the average number of bytes per token. In this tokenization, each unicode char can use multiple bytes, so compression rate >= 1. Example: char `–` takes up 3 bytes, so compression rate is 3/1 = 3

### Core properties

- Treats text as sequence of Unicode code points
- Vocabulary size ~150k (all Unicode chars)
- No OOV tokens possible
- Sequence length equals text length in chars

While simple and universal (handling all languages/scripts with no OOV tokens), it creates long sequences and large vocabularies. Many unicode chars are quite rare, which is inefficient use of the vocabulary. This leads to computational inefficiency in [[2 Zettels/transformer\|transformer]] models ([[2 Zettels/attention mechanism quadratic complexity\|attention mechanism quadratic complexity]]) and forces it to learn word composition from scratch.

```python
class CharacterTokenizer:
    def encode(text):
        return [ord(c) for c in text]

    def decode(tokens):
        return ''.join(chr(t) for t in tokens)
```

### Compared to other methods

- [[2 Zettels/byte tokenization\|byte tokenization]]: similar but uses UTF-8 bytes instead
- [[2 Zettels/word tokenization\|word tokenization]]: shorter sequences but large vocab
- [[2 Zettels/subword tokenization\|subword tokenization]] ([[2 Zettels/byte pair encoding\|BPE]] or [[2 Zettels/wordpiece\|wordpiece]]): balance between vocab size and sequence length

> [!Tip]
>
> Modern systems like [[GPT\|GPT]] use byte-level BPE instead, combining benefits of character and subword approaches

## Related
