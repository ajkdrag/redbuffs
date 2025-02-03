---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - LLMs
> - matrix multiplication

In 1-bit LLMs, weights are represented in binary (or ternary in the case of [[3 Topics/BitNet b1.58\|BitNet b1.58]]). This makes the matrix multiplication very simple.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1731302132/1-bit%20LLMs%20minimize%20matmul%20operations-cc3xl6.webp)

In above example, with  ternary representation `[-1, 0, 1]` of weights, we got rid of multiplication. Special  hardware can be designed for this operation that can make processing very fast.

## Related
