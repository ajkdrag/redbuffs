---
{"publish":true,"created":"2025-05-01T00:15:23.724+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[maximum likelihood estimation\|maximum likelihood estimation]]
> - [[binary classification\|binary classification]]

The principle of Maximum Likelihood Estimation (MLE) is a general method for estimating parameters for any statistical model. It states that given a dataset and a statistical model, the best parameters are those that maximize the probability (likelihood) of observing the given data under that model.

Assume training examples are independent and identically distributed. For binary classification, assume $y^{(i)}$ (target) follows a [[bernoulli distribution\|bernoulli distribution]] with parameter:

$$
p^{(i)} = P(y=1|x^{(i)}; \theta) = h_\theta(x^{(i)})
$$

The probability mass function for $y^{(i)}$ is

$$
P(y^{(i)}|x^{(i)}; \theta) = (h_\theta(x^{(i)}))^{y^{(i)}} (1-h_\theta(x^{(i)}))^{1-y^{(i)}}
$$

The likelihood of the entire dataset is the product of individual probabilities:

$$
\begin{align*}
L(\theta) &= P(y^{(1)}, ..., y^{(m)}|x^{(1)}, ..., x^{(m)}; \theta) \\
&= \prod_{i=1}^m P(y^{(i)}|x^{(i)}; \theta) \\
&= \prod_{i=1}^m (h_\theta(x^{(i)}))^{y^{(i)}} (1-h_\theta(x^{(i)}))^{1-y^{(i)}}
\end{align*}
$$

To maximize likelihood $L(\theta)$, it is numerically more stable and computationally easier to maximize the log-likelihood $\log L(\theta)$:

$$
\log L(\theta) = \sum_{i=1}^m [y^{(i)} \log(h_\theta(x^{(i)})) + (1-y^{(i)}) \log(1-h_\theta(x^{(i)}))]
$$

Maximizing $\log L(\theta)$ is equivalent to minimizing $-\log L(\theta)$. In an optimization setting, we can even divide by $m$ to get an "average loss".

> [!Note]
>
> Observe that this formulation of MLE for binary classification is basically the cost function for [[2 Zettels/logistic regression optimization problem\|logistic regression optimization problem]] as well.

## Related
