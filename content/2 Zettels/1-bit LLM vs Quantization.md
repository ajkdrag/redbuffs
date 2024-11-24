---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[3 Topics/1-bit LLMs\|1-bit LLMs]]
> - [[quantization\|quantization]]

Quantization is typically a post-training process to lower the memory usage of models (though we also have [[quantization-aware training\|quantization-aware training]]), which doesn't require architectural changes. The standard approach is to lower the floating point precision of the weights, e.g. `2.3456...` to `2.3`. This reduction in precision results in faster inference and lower memory usage, but at the cost of **reduced accuracy**.

Contrary to this, in 1-bit LLMs, every weight is represented in binary `[0, 1]` (or ternary in the case of BitNet b1.58 model). The *model training is done from scratch* and there are some [[2 Zettels/architectural changes in 1-bit LLMs\|architectural changes in 1-bit LLMs]] to accomodate this.

## Related