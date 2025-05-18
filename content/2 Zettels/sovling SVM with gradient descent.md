---
{"publish":true,"created":"2025-05-02T17:20:04.120+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/support vector machines\|support vector machines]]
> - [[gradient descent\|gradient descent]]
> - [[optimization\|optimization]]

SVM aims to find a hyperplane that maximizes the margin between classes. The standard formulation is a convex quadratic programming (QP) problem

$$
\text{minimize}\;\frac{1}{2} ||w||^2
$$

subject to $y_i(w^T x_i + b) \ge 1$ for all data points $(x_i, y_i)$ (for hard margin SVM). Solving this QP can use various methods:

- Dual problem solvers (like [[sequential minimal optimization\|SMO]]), common for SVMs that use kernels
- Generic QP solvers
- [[gradient descent\|Gradient Descent (GD)]] or [[stochastic gradient descent\|Stochastic Gradient Descent (SGD)]] on the primal formulation using [[2 Zettels/hinge loss\|hinge loss]]

Using GD/SGD means minimizing a different, but equivalent, objective function for the [[soft margin SVM\|soft margin SVM]]. The constrained primal problem:

Minimize:

$$
\text{minimize}\;\left(\frac{1}{2} ||w||^2 + C \sum \xi_i\right)
$$

subject to $y_i(w^T x_i + b) \ge 1 - \xi_i$, $\xi_i \ge 0$

This is equivalent to minimizing the regularized [[2 Zettels/hinge loss\|hinge loss]] objective (unconstrained):

$$
\frac{1}{2} ||w||^2 + C \sum \max(0, 1 - y_i(w^T x_i + b))
$$

This objective function is **convex**. Therefore, GD/SGD can find the global minimum:

1.  Initialize $w$ and $b$ (e.g., to zeros)
2.  Repeat until convergence:
    1. Compute gradient of the objective function w.r.t $w$ and $b$
    2. Update parameters: $w := w - \eta \nabla_w(\text{Objective})$, $b := b - \eta \nabla_b(\text{Objective})$, where $\eta$ is learning rate

### Gradient Calculation

Objective is sum of regularization term $\frac{1}{2} ||w||^2$ and sum of hinge losses (across dataset) $C \sum \max(0, 1 - y_i(w^T x_i + b))$. Gradient of a sum is sum of gradients:

- Gradient of $\frac{1}{2} ||w||^2$ w.r.t $w$ is $w$ and $0$ w.r.t $b$
- Gradient of $C \sum \max(0, 1 - y_i(w^T x_i + b))$: for each data point $(x_i, y_i)$, let $z_i = y_i(w^T x_i + b)$:
    - If $z_i \ge 1$ (point correctly classified, outside margin): Gradient of $\max(0, 1 - z_i)$ is $0$
    - If $z_i < 1$ (point violates margin or misclassified): Gradient of $\max(0, 1 - z_i)$ w.r.t $w$ is $-y_i x_i$ and w.r.t $b$ is $-y_i$

**Combined Gradients:**

$$
\begin{align*}
\nabla_w(\text{Objective}) &= w + C \sum_{i \text{ where } z_i < 1} (-y_i x_i) \\
\nabla_b(\text{Objective}) &= C \sum_{i \text{ where } z_i < 1} (-y_i)
\end{align*}
$$

### Parameter Updates

For Batched GD, find gradients as above (across the dataset) and update the params $w$ and $b$ at the end, whereas for [[SGD\|SGD]], update based on gradient from a _single_ sample $(x_i, y_i)$ at each step:

If $z_i \ge 1$:

- $\nabla_w \approx w$ (only regularization contributes)
- $\nabla_b \approx 0$

Else ($z_i < 1$, margin violated):

- $\nabla_w \approx w - C y_i x_i$
- $\nabla_b \approx - C y_i$

Update:

- $w := w - \eta \nabla_w$
- $b := b - \eta \nabla_b$

## Related
