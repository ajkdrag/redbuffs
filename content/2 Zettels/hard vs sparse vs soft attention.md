---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-22T02:09:08.459+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/variants of attention mechanism\|variants of attention mechanism]]

Sparse attention can also be related to the concept of hard vs soft attention. While standard [[2 Zettels/global attention\|soft attention]] uses a continuous weighted average (typically via [[softmax\|softmax]]), [[2 Zettels/hard attention\|hard attention]] makes a discrete selection. It can be seen that [[2 Zettels/sparse attention\|sparse attention]] is a form of soft attention where many weights are zero, or a hybrid approach. Methods like [[sparsemax\|sparsemax]] or $\alpha$-entmax are normalization techniques that produce sparse attention weights differentiably, effectively forcing some attention weights to be exactly zero, bridging the gap between fully dense soft attention and non-differentiable hard attention.

Such methods can make attention outputs more interpretable and focused, and can be useful in scenarios where we suspect the true attention should be sparse (e.g. maybe a task where only a couple of input tokens are truly relevant to each query).

## Related
