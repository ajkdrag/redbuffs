---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[3 Topics/1-bit LLMs\|1-bit LLMs]]

In a [[3 Topics/transformer\|transformer]] block, the feed-forward layer is the most computationally heavy. In 1-bit LLMs, the `nn.Linear` is replaced with a `BitLinear` layer. This layer essentially performs a `RoundClip` operation converting regular float values to -1, 0 or 1.  We also [[2 Zettels/quantize activation functions\|quantize activation functions]] to 8-bit precision in both [[BitNet\|BitNet]] and [[3 Topics/BitNet b1.58\|BitNet b1.58]].

Note that the `RoundClip` operation is *not differentiable*, so we can't directly perform backpropagation. We can use certain tricks such as [[2 Zettels/straight through estimators\|straight through estimators]] (STE) which allows gradients to flow through the non-differentiable rounding operation by approximating its gradient as 1.

## Related
