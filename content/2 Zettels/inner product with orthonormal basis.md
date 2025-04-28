---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-27T01:14:14.920+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/vector inner product\|vector inner product]]

Let $u_1,\ldots,u_n$ be an **orthonormal** (orthogonal and normal aka length 1) [[2 Zettels/basis of a vector space\|basis]] of $V$.

$$
\begin{align*}
&\text{If,}\;&{\bf x}=\sum_{k=1}^{n}x_{k}{\bf u}_{k},\quad{\bf y}=\sum_{k=1}^{n}y_{k}{\bf u}_{k}\\
&\text{then,}\;&\langle{{\bf x,y}}\rangle{=}\sum_{k=1}^{n}\overline{x_k}y_k
\end{align*}
$$

where $\overline{x}$ represents the [[complex conjugate\|complex conjugate]] of $x$. In the context of inner products:

- The conjugate ensures the inner product satisfies $\langle x, y \rangle = \overline{\langle y, x \rangle}$
- For real numbers, $\overline{x} = x$, and $\langle{{\bf x, y}}\rangle{=}{\bf x}^T{\bf y}$

## Related
