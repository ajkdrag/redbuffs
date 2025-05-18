---
{"publish":true,"created":"2025-05-01T18:51:39.524+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[optimization\|optimization]]
> - [[2 Zettels/logistic regression\|logistic regression]]
> - [[gradient descent\|gradient descent]]

Gradient descent is an iterative optimization algorithm that finds the minimum of a function by repeatedly moving in the direction opposite to the gradient. The algo on the [[2 Zettels/logistic regression optimization problem\|logistic regression optimization problem]] $J(\theta)$ is performed as follows:

- **Initialize parameters:** Start with an initial guess for the parameter vector $\theta$. This is often a vector of zeros or small random values
- **Iteratively update parameters:** In each iteration $r$, update the parameters $\theta_r$ to $\theta_{r+1}$ using the following rule: $\theta_{r+1} = \theta_r - \eta \nabla J(\theta_r)$ where $\theta_r$ is the vector of parameters at iteration $r$, and $\eta$ (eta) is the learning rate (or step length), a small positive value that determines the size of the step taken in the direction of the negative gradient. $\nabla J(\theta_r)$ is the gradient of the cost function $J(\theta)$ evaluated at $\theta_r$. The gradient is a vector of partial derivatives of $J(\theta)$ with respect to _each parameter_ $\theta_j$
- **Repeat until Convergence:** Continue computing gradient and updating params for a predetermined number of iterations or until the change in the parameters $\theta$ or the cost function $J(\theta)$ between iterations is smaller than a specified tolerance

### Calculate the Gradient

To perform the update, you need to calculate the partial derivative of the cost function $J(\theta)$ with respect to each parameter $\theta_j$. The cost function is

$$
J(\theta) = -\frac{1}{m} \sum_{i=1}^m [y^{(i)} \log(h_\theta(x^{(i)})) + (1-y^{(i)}) \log(1-h_\theta(x^{(i)}))]
$$

For a single observation $(x^{(i)}, y^{(i)})$ in logistic regression:

- Log-likelihood term:
    $$
    \ell_i(\theta) = y^{(i)} \log h_\theta(x^{(i)}) + (1-y^{(i)}) \log(1-h_\theta(x^{(i)}))
    $$
- Sigmoid function:
    $$
    h_\theta(x^{(i)}) = \sigma(\theta^T x^{(i)}) = \frac{1}{1+e^{-\theta^T x^{(i)}}}
    $$
- Derivative of sigmoid:
    $$
    \sigma'(z) = \sigma(z)(1-\sigma(z))
    $$

Using chain rule:

1. Let $z^{(i)} = \theta^T x^{(i)}$
2. $\frac{\partial \ell_i}{\partial \theta_j} = \frac{\partial \ell_i}{\partial h} \cdot \frac{\partial h}{\partial z} \cdot \frac{\partial z}{\partial \theta_j}$

Breaking it down:

- $\frac{\partial \ell_i}{\partial h} = \frac{y^{(i)}}{h} - \frac{1-y^{(i)}}{1-h}$
- $\frac{\partial h}{\partial z} = h(1-h)$
- $\frac{\partial z}{\partial \theta_j} = x_j^{(i)}$

Combining terms:  
$$\frac{\partial \ell_i}{\partial \theta_j} = (y^{(i)} - h_\theta(x^{(i)})) x_j^{(i)}$$

For full gradient (all $m$ examples):

$$
\begin{alignat*}{3}

&& \nabla_\theta J(\theta) &= \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)}) x^{(i)} \\

& \text{Vector form:}\quad &\nabla_\theta J(\theta) &= \frac{1}{m} X^T (h_\theta(X) - y)
\end{alignat*}
$$

> This derivative represents the average error (predicted probability minus actual outcome) scaled by the corresponding feature value $x_j^{(i)}$ across all training examples.

```python
import numpy as np
# Assume X (m, n+1), y (m,), theta (n+1,), learning_rate eta
# n+1 is because of merging w and b terms
m = len(y)
z = X.dot(theta)
h = sigmoid(z) # Using sigmoid function from LR_003
gradient = (1/m) * X.T.dot(h - y)
theta = theta - eta * gradient
```

## Related

- [[2 Zettels/logistic regression from scratch\|logistic regression from scratch]]
