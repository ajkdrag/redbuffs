---
{"publish":true,"created":"2025-04-27T01:02:47.594+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[linear algebra\|linear algebra]]
> - [[matrices\|matrices]]
> - [[inner product\|inner product]]

Matrix inner product extends [[2 Zettels/vector inner product\|vector inner product]] to matrices. Treat matrices as stacked column vectors, then compute inner product between these long vectors

Key properties:

- Generalizes dot product to matrices
- Measures "alignment" between two matrices
- Used in [[matrix norms\|matrix norms]] and optimization problems

> [!Example]
>
> Frobenius inner product for $A,B\in\mathbb{R}^{m\times n}$:
>
> $$
> \langle A,B \rangle = Tr(A^TB) = \sum_{i,j} A_{ij}B_{ij}
> $$
>
> Let:
>
> $$
> A = \begin{bmatrix}1 & 2\\3 & 4\end{bmatrix}, \quad B = \begin{bmatrix}5 & 6\\7 & 8\end{bmatrix}
> $$
>
> 1. Element-wise multiplication: $A_{ij}B_{ij}$
> 2. Sum all products: $1\times5 + 2\times6 + 3\times7 + 4\times8 = 70$
>
> Using trace formula:
>
> $$
> A^TB = \begin{bmatrix}1 & 3\\2 & 4\end{bmatrix}\begin{bmatrix}5 & 6\\7 & 8\end{bmatrix} = \begin{bmatrix}26 & 30\\38 & 44\end{bmatrix}
> $$
>
> Result is same: $Tr(A^TB) = 26 + 44 = 70$

> [!Note]
>
> This matches vector inner product when matrices are single column vectors

## Related

- [[2 Zettels/matrix multiplication\|matrix multiplication]]
