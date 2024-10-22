---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/GloVe objective function.md","permalink":"/2-zettels/glo-ve-objective-function/","PassFrontmatter":true}
---



> [!Topics]
> - [[GloVe\|GloVe]]
> - [[loss functions\|loss functions]]

It aims to make the dot product of word vectors (plus biases) approximate the logarithm of the words' co-occurrence count.

$$
\begin{align}
&J = \sum_{i,j=1}^V f(X_{ij})(w_i^T \tilde{w}_j + b_i + \tilde{b}_j - \log X_{ij})^2 \\
\text{where:} \\
J &: \text{the loss function to be minimized} \\
V &: \text{the size of the vocabulary} \\
X_{ij} &: \text{the number of times word } j \text{ occurs in the context of word } i \\
w_i &: \text{the word vector for the main word } i \\
\tilde{w}_j &: \text{the context word vector for the context word } j \\
b_i, \tilde{b}_j &: \text{scalar bias terms for words } i \text{ and } j \\
f(X_{ij}) &: \text{a weighting function that gives less weight to very frequent word pairs}
\end{align}
$$
- Working with very large numbers (like raw co-occurrence counts) can lead to numerical instability in computations. The log transformation helps mitigate this issue
- Treats the target and context words **symmetrically**. This is reflected in the objective function where $w_i$ and $\tilde{w}_j$ play similar roles
- $f(\cdot)$ is the [[2 Zettels/weighting function in GloVe\|weighting function in GloVe]] and plays an important role in stabilizing training

## Related
