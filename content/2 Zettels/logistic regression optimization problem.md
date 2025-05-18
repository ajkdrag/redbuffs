---
{"publish":true,"created":"2025-04-30T18:19:59.700+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/logistic regression\|logistic regression]]
> - [[optimization\|optimization]]

Logistic Regression is a linear model used for [[binary classification\|binary classification]]. Model predicts probability $h(x)$ that input $x$ belongs to positive class ($y=1$). We get $h(x)$ output by applying [[2 Zettels/sigmoid function\|sigmoid function]] $\sigma$ to linear combination of features and weights: $h_\theta(x) = \sigma(\theta^T x)$, where $\theta$ represents parameters (weights and bias, which are usually merged).

Goal of training: find parameters $\theta$ that _best fit_ training data (typicall done using [[maximum likelihood estimation\|maximum likelihood estimation]]) which is _equivalent_ to minimizing a cost function $J(\theta)$ that measures difference between predicted probability $h_\theta(x^{(i)})$ and actual label $y^{(i)}$ for each training example $(x^{(i)}, y^{(i)})$.

### Loss Function (Single Training Instance)

Commonly used loss function for binary classification, including LR, is [[binary cross entropy loss\|binary cross entropy loss]], also known as Log Loss. For single instance $(x, y)$, where $y \in \{0, 1\}$ is true label and $h_\theta(x)$ is predicted probability $P(y=1|x;\theta)$, the loss is:

$$
\mathcal{L}(h_\theta(x), y) = -[y \log(h_\theta(x)) + (1-y) \log(1-h_\theta(x))]
$$

- If $y=1$: Loss $\mathcal{L} = -\log(h_\theta(x))$. Loss is small when $h_\theta(x)$ is close to 1, large when $h_\theta(x)$ is close to 0. Penalizes model for assigning low probability to the true positive class
- If $y=0$: Loss $\mathcal{L} = -\log(1-h_\theta(x))$. Loss is small when $h_\theta(x)$ is close to 0 (meaning $1-h_\theta(x)$ is close to 1), large when $h_\theta(x)$ is close to 1. Penalizes model for assigning high probability to the wrong (positive) class

This loss function is directly [[2 Zettels/MLE for binary classification\|derived]] from the [[cross entropy\|cross entropy]] between the true distribution (a [[bernoulli distribution\|bernoulli distribution]] concentrated at $y$) and the predicted distribution (a Bernoulli distribution with parameter $h_\theta(x)$).

### Loss Function (Over Entire Training Set)

Total cost function $J(\theta)$ is typically average of loss over all $m$ training examples:

$$
\begin{align*}
J(\theta) &= \frac{1}{m} \sum_{i=1}^m \mathcal{L}(h_\theta(x^{(i)}), y^{(i)}) \\
&= -\frac{1}{m} \sum_{i=1}^m [y^{(i)} \log(h_\theta(x^{(i)})) + (1-y^{(i)}) \log(1-h_\theta(x^{(i)}))]
\end{align*}
$$

Minimizing $J(\theta)$ with respect to $\theta$ finds parameters that yield lowest average prediction error across dataset.

In most cases, there is no analytical solution to find the parameters $\theta$ that maximize the log-likelihood (or minimize the negative log-likelihood) for logistic regression. Instead, iterative numerical optimization procedures such as [[2 Zettels/gradient descent for logistic regression\|gradient descent for logistic regression]] used.

**Why Log Loss instead of Mean Squared Error (MSE)?**

Consider using MSE: $J_{MSE}(\theta) = \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})^2$. While MSE works for linear regression, it is problematic for LR when combined with the sigmoid activation.

- $h_\theta(x) = \sigma(\theta^T x)$. Substituting this into the MSE formula results in a non-[[convex function\|convex]] cost function with respect to $\theta$
- Non-convex functions have multiple local minima. [[gradient descent\|gradient descent]] can get stuck in these local minima, failing to find the global minimum and thus optimal $\theta$
- Log Loss function $J(\theta)$ for Logistic Regression is **convex**. This guarantees that [[gradient descent\|gradient descent]] will converge to the unique global minimum, finding optimal parameters $\theta$

## Related
