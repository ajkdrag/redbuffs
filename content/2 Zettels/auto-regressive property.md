---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/auto-regressive property.md","permalink":"/2-zettels/auto-regressive-property/","PassFrontmatter":true}
---


> [!Topics]
> - [[sequence modelling\|sequence modelling]]

The auto-regressive property refers to a model's ability to make predictions based on its own previous outputs or historical values. More specifically, an auto-regressive model predicts the current value based on past values in a sequence.

$$
P(x_1, x_2, ..., x_n) = P(x_1) \times P(x_3 \mid x_1,x_2) \times \ldots \times P(x_n \mid x_1,...,x_{n₋1})
$$

Common Applications:
- Language Models (like [[3 Topics/GPT\|GPT]])
- Time Series Prediction
- Speech Generation
- Music Generation

> [!Example]
> **Input**: `The cat sits on`
> **Step 1**: Predict `the` based on `The cat sits on`
> **Step 2**: Predict `mat` based on `The cat sits on the`
> **Result**: `The cat sits on the mat`

This property is well suited for generative tasks, but can be slow (one output at a time) and suffer from error accumulation.

## Related
- [[2 Zettels/teacher forcing\|teacher forcing]]
