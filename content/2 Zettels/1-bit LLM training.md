---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[3 Topics/1-bit LLMs\|1-bit LLMs]]
> - [[quantization\|quantization]]

In 1-bit LLMs, we deal with binarized model weights ⎯ in [[BitNet\|BitNet]], it's binary `[-1, 1]`, while in [[3 Topics/BitNet b1.58\|BitNet b1.58]], it's ternary `[-1, 0, 1]`. To perform this binarization, few non-differentiable operations such `round()` and `clip()` are employed in the layer. Since these are non-differentiable, we use tricks such as [[2 Zettels/straight through estimators\|straight through estimators]] to approximate the gradient during backpropagation.

Another note is that we do **mixed precision training** ⎯  [[2 Zettels/quantize activation functions\|quantize activation functions]] and weights, but store the gradients and the optimizer states in high precision to ensure training stability and accuracy. The original high precision weights are binarized during forward pass. While training, they undergo parameter updates like normal, but have no role during inference. 

> [!Note]
> Small update on the high precision weights often makes no difference in the binarized 1-bit weights, so large learning rate is used for better convergence.
## Related
