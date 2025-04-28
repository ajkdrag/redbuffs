---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-27T00:45:14.173+05:30"}
---


> [!Topics]
>
> - [[linear algebra\|linear algebra]]

A set of vectors $\{v_1,v_2\ldots v_n\}\in\mathbb{V}$, where $\mathbb{V}$ is a [[vector space\|vector space]], is **linearly independent**, if the only way to make their linear combination equal the 0 vector, is by having every coefficient be 0. Mathematically:

$$
\sum_{i=1}^{n}{\alpha_iv_i}=0\implies\alpha_1=\alpha_2=\cdots=\alpha_n=0
$$

Think of it this way, if we have 3 vectors $v_{1},v_{2}$ and $v_{3}$, with $v_{2}=3v_{1}$ (i.e **not linearly independent**), then to form the 0 vector, we can have coefficients as $\{-3, 1, 0\}$ respectively, which are **not all zeros**.

## Related
