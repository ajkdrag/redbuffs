---
{"publish":true,"tags":["type/zettel","status/done"],"path":"2 Zettels/perception classification rule.md","permalink":"/2-zettels/perception-classification-rule/","PassFrontmatter":true}
---


> [!Topics]
> - [[binary classification\|binary classification]]
> - [[classical machine learning\|classical machine learning]]

Perceptron is a simple binary classification algorithm. The decision rule can be illustrated with an example:

Give a person, we want to predict whether to approve credit or not. The person has some features related to his/her transaction history, credit score etc, given by $\mathbf{x}$ which is a d-dimensional feature vector. We have a weight vector $\mathbf{w}$ and some threshold $\gamma$, using which we can define some decision rule as:
$$
\begin{align*}
\hat{y} &= \begin{cases}
1 & \text{if } \mathbf{w} \cdot \mathbf{x} \ge \gamma \\
-1 & \text{otherwise}
\end{cases} \\
&=\text{sign}\Bigg(\sum^{d}_{i=1} w_i x_i - \gamma \Bigg)
\end{align*}
$$
where $\hat{y}=1$ implies approving credit for the person and $\hat{y}=-1$ implies rejection. Note that different choices of $\gamma$ and $\mathbf{w}$ yield different **hypothesis** which collectively form a **hypothesis set**.

> [!note]
> One can see that this is the same as weights $\mathbf{w}$ and biases $\gamma$ in neural net linear layers.

If we set $w_0=-\gamma$ and $x_0=1$ , we can simply the expression above as:
$$
\begin{align*}
&=\text{sign}\Bigg(\sum^{d}_{i=0}w_i x_i \Bigg)\\
&=\text{sign}(\mathbf{w}^{\top}{\mathbf{x}})
\end{align*}
$$
which is basically the sign of the dot product between $\mathbf{w}$ and $\mathbf{x}$. Our goal would then be to find good values for $\mathbf{w}$ such that we get good (or even perfect) classification. That's where we need to come up with a [[2 Zettels/perceptron learning algorithm\|learning algorithm]].

## Related
