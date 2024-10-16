---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/co-occurrence ratio helps distinguish between related and unrelated words.md","permalink":"/2-zettels/co-occurrence-ratio-helps-distinguish-between-related-and-unrelated-words/","PassFrontmatter":true}
---


Topics: [[GloVe\|GloVe]]
Links:

The ratio of co-occurrence probabilities in GloVe provides an intuitive way to capture relationships between words. This can be illustrated using the example of "ice" and "steam" as center words, with various context words.

Let $p_{ij} = P(w_j | w_i)$ be the probability of seeing word $w_j$ in the context of word $w_i$.

Consider the following co-occurrence probability ratios:

| Context word ($w_k$) | $P(w_k \vert \text{ice})$ | $P(w_k \vert \text{steam})$ | Ratio |
|----------------------|----------------------|-------------------------|-------|
| solid                | 0.00019              | 0.000022                | 8.9   |
| gas                  | 0.000066             | 0.00078                 | 0.085 |
| water                | 0.003                | 0.0022                  | 1.36  |
| fashion              | 0.000017             | 0.000018                | 0.96  |

Interpreting these ratios:

1. **Related to "ice", unrelated to "steam"**: 
   - For "solid", ratio = 8.9 (much larger than 1)
   - Indicates a strong association with "ice" but not with "steam"

2. **Related to "steam", unrelated to "ice"**:
   - For "gas", ratio = 0.085 (much smaller than 1)
   - Indicates a strong association with "steam" but not with "ice"

3. **Related to both "ice" and "steam"**:
   - For "water", ratio = 1.36 (close to 1)
   - Indicates a relationship with both words

4. **Unrelated to both "ice" and "steam"**:
   - For "fashion", ratio = 0.96 (very close to 1)
   - Indicates no strong relationship with either word

GloVe uses these ratios to learn word vectors that preserve these relationships in the embedding space. We can design a function of three word vectors to fit this ratio, which helps us to [[2 Zettels/derive the GloVe objective function\|derive the GloVe objective function]] later.
$$
f(\mathbf{u}_j, \mathbf{u}_k, {\mathbf{v}}_i) \approx \frac{p_{ij}}{p_{ik}}
$$