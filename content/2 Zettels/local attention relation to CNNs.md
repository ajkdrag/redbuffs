---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-19T11:58:47.648+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/attention mechanism\|attention mechanism]]
> - [[neural network design pattern\|neural network design pattern]]

Concept of [[2 Zettels/local attention\|local attention]] shares similarities with [[convolutional neural networks\|convolutional neural networks]] (CNNs), as both emphasize the processing of local context.

Stacking local attention layers expands the receptive field, analogous to how [[stacking convolutional layers increases the receptive field\|stacking convolutional layers increases the receptive field]] in CNNs. This similarity makes local attention particularly well-suited for data modalities with strong locality, such as images or time series, where nearby elements are often highly correlated.

However, a key difference lies in the application of weights: CNNs apply _static, learned_ convolutional kernels across the input, whereas local attention _dynamically_ computes attention weights based on the interaction between the query and keys within the local window (the [[2 Zettels/key-query-value KQV framework\|key-query-value KQV framework]]). This dynamic weighting allows local attention to adapt its focus within the window based on the specific content.

## Related
