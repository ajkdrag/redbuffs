---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/beam search normalization factor.md","permalink":"/2-zettels/beam-search-normalization-factor/","PassFrontmatter":true}
---


Topics: [[3 Topics/beam search\|beam search]]
Links:

In beam search with beam size $k$, we finally get $k$ sequences, out of which we pick one which maximizes the following score:
$$
\frac{1}{L^\alpha} \sum_{t=1}^L \log P(\hat{y}_{t} \mid \hat{y}_1, \ldots, \hat{y}_{t-1}, \mathbf{c})
$$
This is pretty much the sum of [[log likelihood\|log likelihood]] values, with each term conditioned on previous outputs and context vector $\mathbf{c}$.
> We use log likelihood for numerical stability, since probabilities are multiplied at each step and value will keep getting smaller due to $p\in{[0, 1]}$. 

Additionally, since `log` gives negative value and we want to maximize our log prob, naively the model will *prefer* shorter sentences. To overcome this potential problem, we *normalize by number of words* in sequence hypothesis. Mathematically, we have the normalizing factor as $\frac{1}{L^\alpha}$ with $\alpha \approx 0.75$. 

> [!Example]
> $L=4, \alpha=0.75 \implies \frac{1}{L^\alpha}=0.35$
> $L=8, \alpha=0.75 \implies \frac{1}{L^\alpha}=0.21$. 
Since our log probs are negative, this results in **penalization of shorter sentences**.