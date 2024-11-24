---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[mixture of experts\|mixture of experts]]

- Instead of [[2 Zettels/token routing\|token routing]], if we do sentence/task routing, it would be powerful and allow us to **extract sub-networks** that can be used to serve specific tasks
    - Extracted model will be smaller, and inference will be faster
- [[knowledge distillation\|knowledge distillation]]: distil into a dense model
- [[aggregation of experts\|aggregation of experts]]: merge weights of experts
- Extreme [[quantization\|quantization]], such as ones seen in [[3 Topics/1-bit LLMs\|1-bit LLMs]]

## Related
- [[2 Zettels/popular MoE models\|popular MoE models]]