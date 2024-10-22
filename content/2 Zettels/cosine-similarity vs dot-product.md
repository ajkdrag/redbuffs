---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/cosine-similarity vs dot-product.md","permalink":"/2-zettels/cosine-similarity-vs-dot-product/","PassFrontmatter":true}
---



> [!Topics]
> - [[linear algebra\|linear algebra]]
> - [[distance metrics\|distance metrics]]

The dot product is the simplest way to compare two vectors. 
$$
\vec{a} \cdot \vec{b} = \sum_{i=1}^n a_i b_i = a_1b_1 + a_2b_2 + ... + a_nb_n
$$
Larger dot product generally indicates more similarity. However, it's sensitive to the magnitude (length) of the vectors. Cosine similarity, on the other hand, measures the **cosine of the angle** between two vectors, *effectively normalizing for vector length*.

$$
\text{cosine}(\vec{a}, \vec{b}) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| |\vec{b}|} = \frac{\sum_{i=1}^n a_i b_i}{\sqrt{\sum_{i=1}^n a_i^2} \sqrt{\sum_{i=1}^n b_i^2}}
$$

> Dot product values are unbounded, whereas, for cosine similarity, the value ranges from -1 (completely opposite) to 1 (identical direction). It's not affected by vector magnitude, only direction matters.

In practice, for many NLP tasks, **cosine similarity is often preferred** because it allows for comparing the semantic similarity of words or documents regardless of their frequency or embedding magnitude. However, in some cases where the magnitude carries important information, dot product might be more appropriate.

## Related
