---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/relation of BLEU score with GMAP.md","permalink":"/2-zettels/relation-of-bleu-score-with-gmap/","PassFrontmatter":true}
---


Topics: [[3 Topics/BLEU score\|BLEU score]]
Links: [[geometric mean average precision\|geometric mean average precision]]

In [[2 Zettels/BLEU formula explained\|BLEU formula]], we have a weighting term $w_n$ whose value is kept $1/n$ to reward higher n-grams more if they match with ground truth. Let's ignore the [[2 Zettels/brevity penalty term in BLEU score\|brevity penalty]] and just expand the `exp` term:
$$
\begin{align*}
& \exp\left(\sum_{n=1}^N w_n \log p_n\right) \\
&= \prod_{n=1}^N p_n^{w_n} \\
&= (p_1)^{\frac{1}{1}} \cdot (p_2)^{\frac{1}{2}} \cdot (p_3)^{\frac{1}{3}} \cdot (p_4)^{\frac{1}{4}}
\end{align*}
$$
Had we used a fixed $w_n=1/N$, this would be identical to [[geometric mean average precision\|geometric mean average precision]] (GMAP).

$$
\begin{align*}
\text{GMAP} &= \left(\prod_{i=1}^{N} \text{AP}_i\right)^{\frac{1}{N}} \\[10pt]
&= \exp\left(\frac{1}{N} \sum_{i=1}^{N} \log(\text{AP}_i)\right)
\end{align*}
$$
where AP is short for average precision.