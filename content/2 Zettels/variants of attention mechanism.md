---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-17T02:38:35.014+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/attention mechanism\|attention mechanism]]

Let's categorize the attention mechanism based on four key axes:

- **Input Scope:** How much of the input are we attending to
- **Score Computation**: How attention scores are calculated (e.g., dot product, additive)
- **Architecture/Application**: How attention is applied (e.g., self-attention, cross-attention)
- **Efficiency/Optimization**: Techniques to reduce computational cost (e.g., sparse, flash)
- **Special Properties**: Unique constraints or behaviors (e.g., masked, hard)

Most modern attention mechanisms build on the [[2 Zettels/key-query-value KQV framework\|key-query-value KQV framework]]:

- **Queries (Q)**: What we're attending from
- **Keys (K)**: What we're attending to
- **Values (V)**: What we retrieve

|    **Category**    | **Type**                                | **Key Feature**                         | **Use Case**                                           |
| :----------------: | --------------------------------------- | --------------------------------------- | ------------------------------------------------------ |
|    Input Scope     | [[2 Zettels/local attention\|local attention]]                     | Fixed window around position            | [[convolutional neural networks\|convolutional neural networks]] style processing     |
|                    | [[2 Zettels/global attention\|global attention]]                    | Full sequence consideration             | [[2 Zettels/transformer\|transformer]]                                        |
| Score Computation  | Dot Product                             | $q \cdot k$                             | [[2 Zettels/transformer\|transformer]]                                        |
|                    | [[2 Zettels/scaled dot product attention\|scaled dot product attention]]        | $\frac{q \cdot k}{\sqrt{d_k}}$          | [[2 Zettels/transformer\|transformer]]                                        |
|                    | [[2 Zettels/luong attention\|luong attention]]<br>(Multiplicative) | Variants like $q^T W k$                 | [[RNN\|RNN]] seq2seq                                        |
|                    | Additive ([[2 Zettels/bahdanau attention\|bahdanau attention]])       | $v^T \tanh(W_q q + W_k k)$              | Early seq2seq                                          |
|    Architecture    | [[2 Zettels/cross-attention\|cross-attention]]                     | Queries from decoder, keys from encoder | [[2 Zettels/encoder-decoder architecture\|encoder-decoder architecture]] (e.g [[2 Zettels/transformer\|transformer]]) |
|                    | [[2 Zettels/self-attention\|self-attention]]                      | Q, K, V from same sequence              | [[2 Zettels/transformer\|transformer]]                                        |
|                    | [[2 Zettels/multi-head attention\|multi-head attention]]                | Multiple parallel attention heads       | [[2 Zettels/transformer\|transformer]]                                        |
|     Efficiency     | [[2 Zettels/sparse attention\|sparse attention]]                    | Attends to subset of positions          | Long sequences                                         |
|                    | [[flash attention\|flash attention]]                     | Optimized computation/memory            | Speeding up transformers                               |
| Special Properties | [[2 Zettels/masked attention\|masked attention]]                    | Blocks future positions                 | [[2 Zettels/auto-regressive property\|auto-regressive property]] models                    |
|                    | [[2 Zettels/hard attention\|hard attention]]                      | Selects one position                    | Interpretability                                       |

## Related
