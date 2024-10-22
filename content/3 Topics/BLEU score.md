---
{"publish":true,"tags":["status/done","type/topic"],"path":"3 Topics/BLEU score.md","permalink":"/3-topics/bleu-score/","PassFrontmatter":true}
---



Bilingual Evaluation Understudy (BLEU) is a metric for evaluating Machine translation, with value in range 0 to 1. The higher the BLEU score, the closer the computer-generated text is to the human-translated reference text. It uses a **weighted sum of precisions of n-grams** $p_n$ at its core along with a [[2 Zettels/brevity penalty term in BLEU score\|brevity penalty]] (BP) to penalize translations that are too short. The [[2 Zettels/BLEU formula explained\|BLEU formula]] is:
$$
\text{BLEU} = \text{BP} \cdot \exp\left(\sum_{n=1}^{N} w_n \log(p_n)\right)
$$

Calculation steps:
  - Choose the n-gram order: N=4 typically
  - Count matching n-grams: For each n-gram size, calculate how many matching n-grams exist between the machine-generated text and the reference translations. Be sure to account for repeated phrases
  - Calculate the [[2 Zettels/precision of n-grams in BLEU\|precision of n-grams in BLEU]] i.e. $p_n$ values
  - Do the weighted sum of log probs, followed by exponentiation, which is very similar to [[geometric mean average precision\|geometric mean average precision]]:
	$$
		 \begin{align*}
& \exp\left(\sum_{n=1}^N w_n \log p_n\right) \\
	&= \prod_{n=1}^N p_n^{w_n} \\
	&= (p_1)^{\frac{1}{1}} \cdot (p_2)^{\frac{1}{2}} \cdot (p_3)^{\frac{1}{3}} \cdot (p_4)^{\frac{1}{4}}
	\end{align*}
	$$ 
  - Apply BP to get the final BLEU score

## Related
- [[3 Topics/encoder-decoder architecture\|encoder-decoder architecture]]
