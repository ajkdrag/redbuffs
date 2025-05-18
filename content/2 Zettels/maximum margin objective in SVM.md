---
{"publish":true,"created":"2025-05-02T14:08:07.373+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/support vector machines\|support vector machines]]
> - [[optimization\|optimization]]

Support Vector Machines (SVM) find the optimal hyperplane to separate data points into different classes. Key idea is to maximize the distance between the hyperplane and the closest data points. This distance is called the **margin**. A larger margin means better generalization to unseen data.

The separating hyperplane is defined by $w^Tx + b = 0$. Data points are classified based on the sign of $w^Tx + b$. Additionally, to ensure a margin, we introduce _canonical hyperplanes_ (margin boundaries) at $w^Tx + b = +1$ and $w^Tx + b = -1$. The data points closest to the separating hyperplane, called **support vectors**, lie exactly on these boundaries.

> [!Note]
>
> Choosing a different value, like $\pm 0.5$ or any $\pm k$ for $k>0$, would result in the same optimal separating hyperplane but with scaled parameters ($w$ and $b$ would be scaled by $1/k$). Setting it to $\pm 1$ is simply a standardized normalization that simplifies the mathematical formulation of the optimization problem.

### Objective

The geometric distance between the $w^Tx + b = +1$ and $w^Tx + b = -1$ hyperplanes is:

$$
\frac{2}{||w||_2}
$$

_Maximizing_ this distance is the objective and has [[2 Zettels/intuition behind maximizing the geometric margin in SVM\|desirable properties]].

$$
\text{maximize}\;\frac{2}{||w||_2} \implies \text{minimize}\;{||w||_2} \approx \frac{1}{2}||w||_2^2
$$

> [!Question] Why minimize $\frac{1}{2}||w||_2^2$
>
> Minimizing $||w||_2^2$ is same as minimizing $||w||_2$ (squaring a positive value doesn't change location of minimum). The factor $\frac{1}{2}$ is added for mathematical convenience. The gradient of $\frac{1}{2}||w||_2^2$ is $w$, which simplifies derivative calculations, especially when using [[lagrange multipliers\|lagrange multipliers]] for optimization.

This minimization is performed subject to constraints: for each training point $(x_i, y_i)$, the constraint ensures it is on the correct side of the margin. Using the canonical representation where the functional margin is 1, the constraint is $y_i(w^Tx_i + b) \ge 1$.

For [[soft margin SVM\|soft margin SVM]], which allows some points to be misclassified or violate the margin, slack variables $\xi_i \ge 0$ are introduced. The constraint becomes $y_i(w^Tx_i + b) \ge 1 - \xi_i$, and a penalty term $C\sum \xi_i$ is added to the objective function. The objective is then termed as [[soft margin objective in SVM\|soft margin objective in SVM]].

So basically, maximize the margin -> minimize the cost function defined above subject to some constraints. Observe that this is a convex quadratic programming (QP) problem and there are few ways to solve this:

- typically solved by formulating and solving its dual problem
    - specialized algorithms like Sequential Minimal Optimization (SMO) are effective
- [[2 Zettels/sovling SVM with gradient descent\|gradient descent]] or [[SGD\|SGD]] on the primal formulation

## Related
