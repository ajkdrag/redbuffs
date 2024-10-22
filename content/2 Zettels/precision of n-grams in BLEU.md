---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/precision of n-grams in BLEU.md","permalink":"/2-zettels/precision-of-n-grams-in-bleu/","PassFrontmatter":true}
---



> [!Topics]
> - [[3 Topics/BLEU score\|BLEU score]]

![](https://res.cloudinary.com/dcameztw9/image/upload/v1728369357/jdklgdnl9monuosjeeua.png)

> BLEU score uses the concept of precision of n-grams. Out of all the n-grams in translated sequence $\hat{Y}$, how many of them occur in ground truth sequence $Y$?

Recall that [[precision\|precision]] is: Out of my N predictions, how many were correct?
Let $p_1$ = `precision of 1-gram`, $p_2$ = `precision of 2-gram` etc.

$$
p_n = \frac{\text{Number of matching } n\text{-grams}}{\text{Total number of } n\text{-grams in the candidate}}
$$

Thus $p_2$ will be out of all bigrams in $\hat{Y}$, how many exist in $Y$. In the example, $p_2=3/4$.

> [!Warning]
> $p_1=4/5$ instead of $5/5$, because we **cap the duplicates** by their number of occurrences in the ground truth. `cat` occurred twice in $\hat{Y}$, but only once in $Y$, so we only count it once.

## Related
