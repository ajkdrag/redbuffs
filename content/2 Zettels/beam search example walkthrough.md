---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/beam search example walkthrough.md","permalink":"/2-zettels/beam-search-example-walkthrough/","PassFrontmatter":true}
---


Topics: [[3 Topics/beam search\|beam search]]
Links:

Let's take the case of machine translation using [[3 Topics/encoder-decoder architecture\|encoder-decoder architecture]] where the output vocabulary $V$ consists of five elements: ${A, B, C, D, E}$, with one representing the end-of-sequence token.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1728202854/oo1hqyxd3muavnehg7pc.png)

In this example, the beam size is set to 2, and the maximum output sequence length is 3. At time step 1, the algorithm begins with an empty sequence and selects the two tokens with the highest conditional probabilities $P(\hat{y}_1 \mid \mathbf{c})$, which are $A$ and $C$. Here, $\mathbf{c}$ represents the context or input.

Moving to time step 2, the algorithm expands each of these initial tokens by considering all possible next tokens $\hat{y}_2 \in V$. It computes the probabilities:

$$P(A, \hat{y}_2 \mid \mathbf{c}) = P(A \mid \mathbf{c})\cdot P(\hat{y}_2 \mid A, \mathbf{c})$$
$$P(C, \hat{y}_2 \mid \mathbf{c}) = P(C \mid \mathbf{c})\cdot P(\hat{y}_2 \mid C, \mathbf{c})$$

From these *ten possibilities*, it selects the *two sequences* with the highest probabilities, shown in the diagram as $AB$ and $CE$.

At the final time step 3, the process repeats. For each of the two sequences from step 2, it computes:

$$P(A, B, \hat{y}_3 \mid \mathbf{c}) = P(A, B \mid \mathbf{c})\cdot P(\hat{y}_3 \mid A, B, \mathbf{c})$$
$$P(C, E, \hat{y}_3 \mid \mathbf{c}) = P(C, E \mid \mathbf{c})\cdot P(\hat{y}_3 \mid C, E, \mathbf{c})$$

Again, it selects the two highest probability sequences, resulting in $ABD$ and $CED$ as the final candidates and choose the one which maximizes the following score:
$$
\frac{1}{L^\alpha} \log P(\hat{y}_1, \ldots, \hat{y}_{L}\mid \mathbf{c}) = \frac{1}{L^\alpha} \sum_{t=1}^L \log P(\hat{y}_{t} \mid \hat{y}_1, \ldots, \hat{y}_{t-1}, \mathbf{c})
$$

The above score is just [[log likelihood\|log likelihood]], but with the additional [[2 Zettels/beam search normalization factor\|beam search normalization factor]].