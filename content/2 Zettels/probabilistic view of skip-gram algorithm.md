---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/probabilistic view of skip-gram algorithm.md","permalink":"/2-zettels/probabilistic-view-of-skip-gram-algorithm/","PassFrontmatter":true}
---


Topics: [[3 Topics/skip-gram\|skip-gram]]
Links:

The skip-gram model in [[3 Topics/word2vec\|word2vec]] is fundamentally based on a probabilistic view of word-context relationships. Let's build this view from the ground up with few basic assumptions: 

- [[2 Zettels/distributional hypothesis\|distributional hypothesis]]: Words that appear in similar contexts have similar meanings
- If we know a center word (like "loves"), we can predict its surrounding words (like "the", "man", "his", and "son")

 > Skip-gram treats this as a prediction problem: "Given a word, what is the likelihood of its surrounding words?"

Given center word $w_c$ and context words $w_o$ (the words within a window size around the center word), the **conditional probability** is expressed as:
$$
P(w_o \mid w_c)
$$

> [!note] Conditional Independence Assumption
> $$
> P(w_{context_1}, w_{context_2}, \dots \mid w_c) = P(w_{context_1} \mid w_c) \cdot P(w_{context_2} \mid w_c) \cdot \dots
> $$
> This assumption reduces the complexity of the problem, making it tractable.

For a text sequence of length $T$ and using $m$ as the context window size, we would like to maximize the probability of *all word-context pairs* in the corpus. Formally:
$$
\text{maximize}\;\Bigg\{ \prod_{t=1}^{T} \prod_{-m \leq j \leq m, j \neq 0} P(w^{(t+j)} \mid w^{(t)})\Bigg\}
$$

To make optimization easier, we take the log of the objective, turning the product into a sum. This gives us the log-likelihood objective function:
$$
\text{maximize}\;\Bigg\{ \sum_{t=1}^{T} \sum_{-m \leq j \leq m, j \neq 0} \log P(w^{(t+j)} \mid w^{(t)})\Bigg\}
$$
The authors chose to model the conditional probability in an interesting way: 
> Each word has two d-dimensional-vector representations for calculating conditional probabilities. More concretely, for any word with index $i$ in the dictionary, denote by $\mathbf{v}_i$ and $\mathbf{u}_i$ its two vectors when used as a _center_ word and a _context_ word, respectively. The question on [[2 Zettels/why we need two weight matrices in word2vec\|why we need two vector representations]] is still unclear.

With this, the conditional probability of generating any context word $w_o$ (with index $o$ in the dictionary) given the center word $w_c$ (with index $c$ in the dictionary) can be modeled by a **softmax operation on vector dot products**:
$$
P(w_o \mid w_c) = \frac{\exp(\mathbf{u}_o^\top \mathbf{v}_c)}{\sum_{i \in V} \exp(\mathbf{u}_i^\top \mathbf{v}_c)}
$$

The formulation ensures that the probability of selecting a particular context word increases when the vector similarity (dot product $\mathbf{u}_o^\top \mathbf{v}_c$) is higher.
> [!tip] Practical optimizations
> Computing the denominator (normalization term) is expensive as it sums over all context words. Some solutions are: 
> - [[skip-gram with heirarchical softmax\|skip-gram with heirarchical softmax]]: Use a binary tree structure to reduce computation
> - [[skip-gram with negative sampling\|skip-gram with negative sampling]]: Use $k$ negative samples instead of all contexts
