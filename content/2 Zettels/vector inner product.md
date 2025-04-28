---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-27T00:51:52.999+05:30"}
---


> [!Topics]
>
> - [[linear algebra\|linear algebra]]

For a pair of vectors $x,y\in\mathbb{V}$, the inner product is a scalar function denoted by $\langle x,y \rangle:\mathbb{V}\times\mathbb{V}\to\mathbb{F}$, satisfying the following properties:

- **Conjugate symmetry**: $\forall{x,y}\in\mathbb{V}:\langle{x,y}\rangle=\overline{\langle{y,x}\rangle}$.
- **Linearity**: $\forall{x_1,x_2,y}\in\mathbb{V}$ and $\forall{\alpha,\beta}\in\mathbb{F}:\langle\alpha{x_1}+\beta{x_2},y\rangle=\alpha\langle{x_1,y}\rangle{+}\beta\langle{x_2,y}\rangle$
- **Positive Definiteness**: $\forall{x}\in\mathbb{V}:\langle{x,x}\rangle\ge0$ and $\langle{x,x}\rangle{=}0$ if and only if $x=0$

A [[vector space\|vector space]] $\mathbb{V}$ equipped with an inner product $\langle{x,y}\rangle{:}\mathbb{V}\times\mathbb{V}\to\mathbb{F}$ is called an **inner product space**.

### Examples

- Standard inner product: $x,y\in\mathbb{R}^n:\langle{x,y}\rangle=x^Ty=\sum_{i=1}^{n}x_iy_i$.
- Also, geometrically, $\langle{x,y}\rangle=\|x\|\|y\|\cos{\theta}$ where $\theta$ is the angle between $x$ and $y$.

## Related
