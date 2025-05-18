---
{"publish":true,"created":"2025-04-30T17:33:39.126+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[classical machine learning\|classical machine learning]]

Logistic Regression: [[2 Zettels/supervised learning\|supervised learning]] algorithm primarily for [[binary classification\|binary classification]] problems. Goal is to predict the probability that an input sample belongs to a particular class (commonly labeled 1 or 0). It is called logistic regression because it performs regression on [[logits\|logits]], which then allows us to classify the data based on model probability predictions.

> [!Note]
>
> Despite 'regression' in name, it predicts probability of categorical outcome, not a continuous value. Core idea: model probability $P(y=1\mid x)$ using a _transformation_ of a linear combination of input features.

$$
P(y=1 \mid x) = \sigma(w^T x + b)
$$

- $x$: input feature vector
- $w$: weight vector learned during training
- $b$: bias term learned during training
- $\sigma$: the [[2 Zettels/sigmoid function\|sigmoid function]]

$$
\sigma(z) = \frac{1}{1 + e^{-z}}
$$

It maps any real number $z$ to a value between 0 and 1, making it suitable for representing probabilities. The term $z = w^T x + b$ is a linear score or _evidence_ for the positive class. A large positive $z$ results in a probability close to 1, a large negative $z$ in a probability close to 0, and $z=0$ results in $P=0.5$.

> Logistic Regression models the linear relationship between input features and the **log-odds** ([[logits\|logits]]) of the positive outcome. The odds of an event are:

$$
\frac{P(y=1|x)}{P(y=0|x)} = \frac{P}{1-P}
$$

Taking the natural logarithm gives the log-odds:

$$
\log\left(\frac{P(y=1|x)}{1 - P(y=1|x)}\right) = w^T x + b
$$

This equation shows that the linear model $w^T x + b$ is modeling the log-odds, not the probability directly. Solving for $P(y=1|x)$ recovers the sigmoid form.

**Decision Boundary**: To make a class prediction (0 or 1), a threshold is applied to the predicted probability. Commonly, if $P(y=1|x) > 0.5$, predict class 1; otherwise, predict class 0. $P(y=1|x) > 0.5 \implies \sigma(w^T x + b) > 0.5$. Since $\sigma(z) > 0.5$ when $z > 0$, the decision boundary is defined by $w^T x + b = 0$. This equation represents a hyperplane in the feature space, making Logistic Regression a **linear classifier**.

**Training:** Parameters $w$ and $b$ are typically learned using [[maximum likelihood estimation\|maximum likelihood estimation]] (MLE). This is equivalent to minimizing the [[cross-entropy loss\|cross-entropy loss]] between predicted probs and true labels. MLE sets up the [[2 Zettels/logistic regression optimization problem\|logistic regression optimization problem]] and one can obtain maximum likelihood estimates using different methods. Using an optimization algorithm such as [[gradient descent\|gradient descent]] is one of them.

## Related

- [[linear regression\|linear regression]]
