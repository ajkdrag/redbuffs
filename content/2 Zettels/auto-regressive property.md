---
{"publish":true,"created":"2024-10-22T19:21:17.832+05:30","tags":["status/done","type/zettel"],"cssclasses":""}
---


> [!Topics]
>
> - [[sequence modeling\|sequence modeling]]

The auto-regressive property refers to a model's ability to make predictions based on its own previous outputs or historical values. More specifically, an auto-regressive model predicts the current value based on past values in a sequence.

$$
P(x_1, x_2, ..., x_n) = P(x_1) \times P(x_3 \mid x_1,x_2) \times \ldots \times P(x_n \mid x_1,...,x_{n₋1})
$$

```
Input: The cat sits on

Step 1: The cat sits on → the
Step 2: The cat sits on the → mat
```

**Common Applications**

- Language Models (like [[GPT\|GPT]])
- Time Series Prediction
- Speech Generation
- Music Generation

This property is well suited for generative tasks, but can be slow (one output at a time) and suffer from error accumulation.

## Related

- [[2 Zettels/teacher forcing\|teacher forcing]]
