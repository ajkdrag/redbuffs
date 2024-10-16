---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/cross-entropy loss formula.md","permalink":"/2-zettels/cross-entropy-loss-formula/","PassFrontmatter":true}
---



Topics: [[loss functions\|loss functions]] | [[cross-entropy\|cross-entropy]]
Links:

$$
\begin{align}
    \mathcal{L}_{\text{CE}} &= -\sum_{i=1}^{N} \sum_{c=1}^{C} y_{i,c} \log(\hat{y}_{i,c}) \\
    \text{where:} & \\
    \mathcal{L}_{\text{CE}} &= \text{Cross-Entropy Loss} \\
    N &= \text{Number of samples} \\
    C &= \text{Number of classes} \\
    y_{i,c} &= \text{True probability for class $c$ of the $i$-th sample} \\
    \hat{y}_{i,c} &= \text{Predicted probability for class $c$ of the $i$-th sample}
\end{align}
$$

The outer summation over the N samples (or mini-batch) can either be sum (like above) or average. This is governed by the param `reduction` in PyTorch. This formula can be used for [[multi-class classification\|multi-class classification]] as well as [[multi-label classification\|multi-label classification]], but in Pytorch, `nn.CrossEntropyLoss` is used for multi-class since it applies softmax internally, while `nn.BCEWithLogitsLoss` is used for mult-label since it applies sigmoid internally.