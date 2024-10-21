---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/GloVe interpretation through co-occurrence ratios.md","permalink":"/2-zettels/glo-ve-interpretation-through-co-occurrence-ratios/","PassFrontmatter":true}
---


Topics: [[GloVe\|GloVe]]
Links:

GloVe (Global Vectors for Word Representation) is a method for creating word embeddings that can be interpreted through the lens of word co-occurrence probabilities.

Key points:
- GloVe uses the ratio of co-occurrence probabilities to capture word relationships
- The [[2 Zettels/co-occurrence ratio helps distinguish between related and unrelated words\|co-occurrence ratio helps distinguish between related and unrelated words]]
- A function is designed to fit this ratio using word vectors

The co-occurrence probability ratio is defined as:

$$ 
\frac{p_{ij}}{p_{ik}} = \frac{P(w_j | w_i)}{P(w_k | w_i)}
$$

Where:
- $w_i$ is the center word
- $w_j$ and $w_k$ are context words

In terms of co-occurrence counts:

$$
p_{ij} = P(w_j | w_i) = \frac{X_{ij}}{X_i}
$$

Where:
- $X_{ij}$ is the number of times word $j$ appears in the context of word $i$
- $X_i = \sum_k X_{ik}$ is the total number of times any word appears in the context of word $i$

Therefore, the ratio can be expressed as:

$$
\frac{p_{ij}}{p_{ik}} = \frac{X_{ij}/X_i}{X_{ik}/X_i} = \frac{X_{ij}}{X_{ik}}
$$

The goal is to design a function $f$ that approximates this ratio:

$$
f(\mathbf{u}_j, \mathbf{u}_k, \mathbf{v}_i) \approx \frac{p_{ij}}{p_{ik}}
$$

Where $\mathbf{u}$ and $\mathbf{v}$ are word vectors.

This interpretation helps us to [[2 Zettels/derive the GloVe objective function\|derive the GloVe objective function]].