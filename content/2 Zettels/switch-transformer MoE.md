---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[3 Topics/transformer\|transformer]]
> - [[mixture of experts\|mixture of experts]]

A landmark architecture from 2021 by Google, with 1.6T parameters, that like [[2 Zettels/GShard\|GShard]], replaces the FFN layers with MoE layer ⎯ a Switch Transformer layer that takes 2 different tokens as inputs and has 4 experts. During [[2 Zettels/token routing\|token routing]], instead of Top-2, it uses simple single-expert strategy.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1732371908/switch-transformer%20MoE-ljo97j.png)

It also introduced the concept of [[2 Zettels/router z-loss\|router z-loss]] (along with other optimizations), to stabilize training without quality degradation by penalizing large logits entering the gating network. Overall, this architecture achieves 4x pre-train speedup over T5-XXL.

## Related
