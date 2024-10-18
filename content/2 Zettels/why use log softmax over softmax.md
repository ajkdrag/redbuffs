---
{"publish":true,"tags":["type/zettel","status/done"],"path":"2 Zettels/why use log softmax over softmax.md","permalink":"/2-zettels/why-use-log-softmax-over-softmax/","PassFrontmatter":true}
---


Topics: [[optimization\|optimization]]
Links:

In machine learning, it is a common practice to take a natural log of the objective function to simplify taking derivatives. For example, softmax has the following probability function:
$$
p(x_i) = \frac{e^{x_i}}{\sum_{j=1}e^{x_{j}}}
$$
Taking a log simplifies the function:
$$
\log \, p(x_i) = x_i - \log \, {\sum_{j=1}e^{x_{j}}}
$$
Simplifying the original softmax function helps with taking the derivatives in the future. Also, natural log is a **monotonically increasing function**. This ensures that the maximum value of the original probability function occurs at the same point as the log probability function, i.e.
$$
\underset{\theta}{\text{argmax}} \,\, p(x_i) = \underset{\theta}{\text{argmax}} \,\, \log \, p(x_i)
$$

[[1 Drafts/LogSoftmax is more numerically stable\|LogSoftmax is more numerically stable]] and can better handle extreme values in the input data, providing a more balanced and stable output distribution. Another advantage is that it plays nicely with cross-entropy loss. The [[2 Zettels/cross-entropy loss formula\|cross-entropy loss formula]] involves taking the negative log of the probability assigned to a class. If we use `LogSoftmax` instead of softmax, the computation becomes more straightforward and efficient, as the logarithm is *already applied* in the softmax step.
