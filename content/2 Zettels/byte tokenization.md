---
{"publish":true,"created":"2025-04-25T10:52:32.237+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[tokenization\|tokenization]]

Represents text as sequence of **raw bytes** from `[0, 255]`. Each character encoded as 1-4 bytes in UTF-8.

**Advantages:**

- Handles all Unicode text without special rules
- No out-of-vocabulary tokens (any text is a byte sequence)
- Simple implementation

**Disadvantages:**

- Long sequences (3-4x character count) (same problem as [[2 Zettels/character tokenization\|character tokenization]])
- Harder for model to learn meaningful patterns (like chars, bytes on their own have no semantic context)
- Compression rate = 1

```python
text = "こんにちは"  # japanese hello
tokens = list(bytearray(text, "utf-8")) # [227, 129, ..., 175]
print(len(tokens)) # 15
```

Used in [[2 Zettels/subword tokenization\|subword tokenization]] as base for more efficient schemes, such as [[2 Zettels/byte pair encoding\|BPE]].

## Related
