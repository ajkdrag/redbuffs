---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2024-11-14T16:27:04.923+05:30"}
---


> [!Topics]
> - [[3 Topics/BitNet b1.58\|BitNet b1.58]]

To constrain the weights to -1, 0, or +1, in [[3 Topics/BitNet b1.58\|BitNet b1.58]] we adopt an `absmean quantization` function. It first scales the weight matrix by its average absolute value, and then round each value to the nearest integer among {-1, 0, +1}:
$$
\begin{align*}
\widetilde{W}&=\operatorname{RoundClip}(\frac{W}{\gamma+\epsilon},-1,1) \\
\qquad\operatorname{RoundClip}&=\operatorname*{max}(a,\mathrm{min}(b,\mathrm{round}(x))) \\
\qquad\gamma=&\frac{1}{n m}\sum_{i j}|W_{i j}|
\end{align*}
$$

## Related
