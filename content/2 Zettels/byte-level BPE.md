---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-25T15:52:46.753+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/byte pair encoding\|byte pair encoding]]

Byte-level BPE is [[GPT-2\|GPT-2]]'s tokenizer variant. Unlike standard [[2 Zettels/byte pair encoding\|byte pair encoding]], it operates on bytes (256 base tokens, similar to [[2 Zettels/byte tokenization\|byte tokenization]]) rather than Unicode characters. This approach handles all text without needing an `[UNK]` token since any text can be written as a valid byte sequence.

Few kyey differences from standard BPE:

- Base vocab is bytes (256 tokens), not Unicode chars
- Handles non-ASCII chars via byte merging (eg "é" becomes two bytes)
- Treats whitespace as explicit character (eg `"Ġhello"` represents `" hello"`)

Advantages:

- No out-of-vocab issues
- Preserves exact whitespace/punctuation
- Handles arbitrary text including rare Unicode

> [!Warning]
>
> Byte-level BPE results in a slightly larger base vocab (256 instead of ~100 chars), but still manageable. GPT-2’s final vocab was ~50,000 subword tokens.

**Usage:** GPT-2/GPT-3, [[RoBERTa\|RoBERTa]], GPT-Neo/GPT-J, [[CLIP\|CLIP]]'s text encoder etc

## Related
