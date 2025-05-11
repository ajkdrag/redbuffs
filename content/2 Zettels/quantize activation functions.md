---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2024-11-12T15:10:00.992+05:30"}
---


> [!Topics]
> - [[quantization\|quantization]]
> - [[activation function\|activation function]]

Activations are quantized to a specified bit-width (8-bit, in the case of [[2 Zettels/BitNet b1.58\|BitNet b1.58]]) using **absmax per token quantization**. This involves scaling the activations into the range `[−128, 127]` for an 8-bit bit-width. The quantization formula is:

$$
\begin{align*}
s_i &= \frac{127}{\max_{j} |X_{i,j}|} \\
X^{quant}_i &= \text{clamp}_{[-128, 127]}(\text{round}(X_i \cdot s_i)) \\
X^{dequant}_i &= \frac{X^{quant}_{i}}{s_i}
\end{align*}
$$

Breaking down each component:
1. The scale factor $s_i$ which is a scalar for row $i$ is computed as: divide 127 by the maximum absolute value in that row
2. Create a new quantized matrix $X^{quant}_i$ by applying `round clamp/clip` as per formula
3. Finally, dequantize by simply dividing each row by its scale factor $s_i$

The process maintains precision per row while ensuring all values fit within the 8-bit integer range.

> [!Note]
> We apply [[layer normalization\|layer normalization]] (LN) before quantizing the activations to maintain the variance of the output:


## Related
- [[2 Zettels/quantize activation functions in pytorch\|quantize activation functions in pytorch]]