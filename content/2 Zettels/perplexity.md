---
{"publish":true,"created":"2025-04-24T15:44:59.232+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[evaluation metric\|evaluation metric]]
> - [[sequence modeling\|sequence modeling]]

> Measures how well a language model predicts a provided sample of text. A lower perplexity score indicates that the model is better at predicting the text, meaning the text is less "perplexing" to the model.

Unlike extrinsic evaluations that measure performance on a downstream task (like translation or summarization), perplexity directly assesses the language modeling objective: predicting the next token given the previous ones ([[2 Zettels/auto-regressive property\|auto-regressive property]]).

Given a seq of tokens $W=w_1, w_2, \ldots, w_N$, and a language model that provides a probability $P(w_i\mid w_1, \ldots, w_{i-1})$ for each token $w_i$ given the preceding tokens, the perplexity (PP) of the sequence $W$ is calculated as the **inverse probability of the sequence, normalized by the number of tokens N** (normalization to avoid favoring short documents).

The [[joint probability\|joint probability]] of the sequence $W$ under the language model is:

$$
P(W)=P(w_1​,w_2​,\ldots,w_N​)=\prod_{i=1}^N ​P(w_i\mid w_1​,\ldots,w_{i−1}​)
$$

The perplexity is then defined as:

$$
\begin{align*}
PP(W) &= P(W)^{-\frac{1}{N}} \\
PP(W) &= \left(\prod_{i=1}^N ​P(w_i\mid w_1​,\ldots,w_{i−1}​)\right)^{-\frac{1}{N}}
\end{align*}
$$

After simplification, the formula essentially boils down to the exponential of the average [[negative log-likelihood\|negative log-likelihood]] of the tokens:

$$
PP(W) = \exp \left(-\frac{1}{N}\sum_{i=1}^N \log ​P(w_i\mid w_1​,\ldots,w_{i−1}​)\right)
$$

A lower perplexity value means the model assigns a higher probability to the test sequence, indicating a better fit to the data.

> [!Warning]
>
> While fundamental for core modeling assessment, perplexity alone doesn't guarantee good performance on complex tasks like dialogue or QA. Modern evaluations use broader task-specific metrics.

## Related
