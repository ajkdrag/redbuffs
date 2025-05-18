---
{"publish":true,"created":"2024-11-12T13:58:57.468+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[quantization\|quantization]]
> - [[optimization\|optimization]]

STE is a technique used to handle non-differentiable functions in neural networks, particularly useful for training networks with discrete or binary operations.

The core idea is elegant in its simplicity:
- During forward pass: Use the actual discrete/binary function
- During backward pass: Pretend the function was a simple **identity function** (this is an explicit bias)
    - Different gradient approximations can be used instead of the simple identity such as clipping (between -1 and 1) or thresholding the gradients

This is practically used in [[binarized neural networks\|binarized neural networks]] and also to [[2 Zettels/quantize activation functions\|quantize activation functions]], but has limitations in the form of biased gradient estimates and training instability with deep networks. A popular way to implement this is to use the [[2 Zettels/detach trick for straight through estimators\|detach trick for straight through estimators]]


## Related
