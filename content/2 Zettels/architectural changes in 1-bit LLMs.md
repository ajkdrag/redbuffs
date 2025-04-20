---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2024-11-11T10:48:44.459+05:30"}
---


> [!Topics]
> - [[2 Zettels/1-bit LLMs\|1-bit LLMs]]

In a [[2 Zettels/transformer\|transformer]] block, the feed-forward layer is the most computationally heavy. In 1-bit LLMs, the `nn.Linear` is replaced with a `BitLinear` layer. This layer essentially performs a `RoundClip` operation converting regular float values to -1, 0 or 1.  We also [[2 Zettels/quantize activation functions\|quantize activation functions]] to 8-bit precision in both [[BitNet\|BitNet]] and [[2 Zettels/BitNet b1.58\|BitNet b1.58]].

Note that the `RoundClip` operation is *not differentiable*, so we can't directly perform backpropagation. We can use certain tricks such as [[2 Zettels/straight through estimators\|straight through estimators]] (STE) which allows gradients to flow through the non-differentiable rounding operation by approximating its gradient as 1.

## Related
