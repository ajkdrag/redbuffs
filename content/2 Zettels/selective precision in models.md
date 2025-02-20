---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2024-11-24T19:41:46.008+05:30"}
---


> [!Topics]
> - [[quantization\|quantization]]

High precision (32-bit fp) is often wasteful and researchers attempt to convert everything to 16-bit fp or `bfloat16`, but in some cases such as in [[2 Zettels/switch-transformer MoE\|switch-transformer MoE]], model doesn't converge and training is unstable.

To fix this, one can keep parts of the model in high precision while casting other parts to low precision for speed, aka **selective precision**. A good example is the [[2 Zettels/token routing\|token routing]] part in switch-transformers where `softmax` is commonly used. Since exponentiation is sensitive to even minute changes in values, keeping them in high precision is important. Rest of the model can be casted to `bfloat16` ⎯ thus keeping speed and training stability intact.

## Related
- [[mixture of experts\|mixture of experts]]