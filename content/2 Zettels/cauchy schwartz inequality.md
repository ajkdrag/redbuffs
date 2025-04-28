---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-27T00:53:47.712+05:30"}
---


> [!Topics]
>
> - [[linear algebra\|linear algebra]]
> - [[2 Zettels/vector inner product\|vector inner product]]

Cauchy-Schwartz inequality bounds the inner product of two vectors by their lengths. Fundamental in proofs across [[linear algebra\|linear algebra]] and [[optimization\|optimization]].

For any vectors $x,y$ in an inner product space $\mathbb{V}$:

$$
|\langle{x,y}\rangle| \le \|x\|\|y\|
$$

Where:

- $\langle{x,y}\rangle$ is the [[inner product\|inner product]]
- $\|x\| = \sqrt{\langle{x,x}\rangle}$ is the [[2 Zettels/vector norm\|vector norm]]

In $\mathbb{R}^n$ with dot product:

$$
\Bigg\vert{\sum_{i=1}^{n}x_{i}y_{i}}\Bigg\vert \le \sqrt{\sum_{i=1}^n x_i^2} \sqrt{\sum_{i=1}^n y_i^2}
$$

Key implications:

- Angle between vectors is well-defined via $\cos\theta = \langle x,y \rangle / \|x\|\|y\|$
- Basis for [[triangle inequality\|triangle inequality]] in normed spaces

> [!Note]
>
> The inequality holds for _any_ two vectors, but _equality_ holds if and only if the vectors are linearly dependent.

## Related
