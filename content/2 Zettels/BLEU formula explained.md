---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/BLEU formula explained.md","permalink":"/2-zettels/bleu-formula-explained/","PassFrontmatter":true}
---



Topics: [[3 Topics/BLEU score\|BLEU score]]
Links:

Here's the formula for BLEU:
$$
\text{BLEU} = \text{BP} \cdot \exp\left(\sum_{n=1}^{N} w_n \log(p_n)\right)
$$ 
where:
- $\text{BP}$ is the [[2 Zettels/brevity penalty term in BLEU score\|brevity penalty]]
- $p_n$ is the [[2 Zettels/precision of n-grams in BLEU\|precision of n-grams in BLEU]] with value in ${[0, 1]}$
- $w_n$ is the **weight** applied to the n-gram precision score.
	- The weights determine the contribution of each n-gram size to the overall score. A common choice for these weights is $w_n = \frac{1}{n}$ which rewards higher n-grams since they are more challenging to match
	- Expanding the `exp`, it turns out we are doing ${p_n}^{w_n}$ ([[2 Zettels/relation of BLEU score with GMAP\|math explanation]]). If we fix $p_n$, this value will be larger for higher $n$
- $N$ is the maximum n-gram size considered (typically 4)