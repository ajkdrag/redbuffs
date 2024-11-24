---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[mixture of experts\|mixture of experts]]
> - [[model explainability\|model explainability]]

In the context of interpretability of experts in MoE, we can observe:
- **Non-transformer**: More interpretable, clearer specialization
- **Transformer**: More diffuse, harder to characterize expert roles

If we dive deeper into [[3 Topics/transformer\|transformer]] architectures specifically, we can observe (based on [[2 Zettels/switch-transformer MoE\|switch-transformer MoE]] authors):
- **Encoder** expert specializes in shallow concepts
- **Decoder** expert has less specialization

> In a multilingual setup one could imagine each expert specializing in a language, but the opposite happens: due to [[2 Zettels/token routing\|token routing]] and [[2 Zettels/load balancing in MoE\|load balancing in MoE]], there is no single expert specialized in any given language.

## Related
