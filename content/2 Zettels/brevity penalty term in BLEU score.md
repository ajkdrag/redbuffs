---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/brevity penalty term in BLEU score.md","permalink":"/2-zettels/brevity-penalty-term-in-bleu-score/","PassFrontmatter":true}
---



Topics: [[3 Topics/BLEU score\|BLEU score]]
Links:

The brevity penalty (BP) is a factor that penalizes translations that are too short. Recall that we calculate the [[2 Zettels/precision of n-grams in BLEU\|precision of n-grams in BLEU]]. Short translations can *artificially give high precision scores* without conveying complete meaning. If LR is the length ratio of predicted sentence to ground truth sentence, then the BP is defined as follows:
$$
\text{BP} =
\begin{cases} 
1 & \text{if } LR >= 1 \\
e^{(1 - \frac{1}{\text{LR}})} & \text{otherwise } 
\end{cases}
$$

In simpler terms, if LR is >= 1 it means our predicted sentence is atleast as long as ground truth, so we don't penalize it (BP = 1), otherwise, we have this penalty term (a fraction value) which penalizes *harder* as our predictions get shorter (owing to the exp term).
![](https://res.cloudinary.com/dcameztw9/image/upload/v1728314542/jdlcbi4uhvoe29zdbu3s.png)
In the figure above, the ground truth length (`gt_len`) is 5 and if our translated sequence length (`pred_len`) is 5 or above, BP = 1, otherwise BP $\in[0, 1)$