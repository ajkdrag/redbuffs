---
{"publish":true,"created":"2025-05-03T19:35:27.493+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[ml paradigm\|ml paradigm]]
> - [[kernel methods\|kernel methods]]

Kernel Trick is a technique used in machine learning algorithms. Allows algorithms designed for linear data to handle non-linear data. This is done by _implicitly_ mapping data into a higher-dimensional "feature space" where it becomes linearly separable.

Explicitly computing this mapping $\phi(x)$ and working in the high-dimensional space can be computationally expensive or impossible, especially if the space is very high or infinite dimensional. Let's illustrate this with an example: suppose $x \in \mathbb{R}^d$ , and let $\phi(x)$ be the vector that contains all the monomials of x with degree $\le 3$:

$$
\phi(x)=\begin{bmatrix}
1\\
x_1\\
\vdots \\
x_1^2 \\
x_1x_2 \\
\vdots \\
x_2x_1 \\
x_1^3 \\
x_1^2 x_2 \\
\vdots
\end{bmatrix}
$$

The "trick" is that many linear machine learning algorithms (such as the [[SVM dual formulation\|SVM dual formulation]] and [[2 Zettels/PCA\|PCA]]) only require calculating dot products ([[inner product\|inner product]]) between data points. The kernel trick defines a function, called a kernel function $K(x, z)$, that **directly computes** (we don't need to transform $x\rightarrow \phi(x)$) the dot product of the data points after they have been mapped to the higher-dimensional space, i.e.,

$$
K(x, z) = \phi(x)^T \phi(z)
$$

By replacing the original dot product $x^T z$ with $K(x, z)$ in the algorithm, the model _behaves_ as if it is operating in the high-dimensional feature space without ever needing to explicitly compute the coordinates in that space or the mapping function $\phi$. This avoids the computational burden of explicit feature mapping.

> [!Note]
>
> A function $K$ is a valid kernel if it corresponds to a dot product in some feature space (satisfies [[mercer's condition\|mercer's condition]]).

## Related

- [[2 Zettels/popular kernels used in ml\|popular kernels used in ml]]
