---
{"publish":true,"created":"2025-05-12T12:30:07.192+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[probability\|probability]]

Conditional probability describes the likelihood of an event $A$ occurring, given that another event $B$ has already occurred.

$$
P(A\mid B) = \frac{P(A \cap B)}{P(B)}
$$

Where:

- $P(A \mid B)$ is the conditional probability of $A$ given $B$
- $P(A \cap B)$ is the joint probability of both $A$ and $B$ occurring
- $P(B)$ is the probability of $B$ occurring

Conditional probability is crucial in [[bayesian inference\|bayesian inference]] and [[markov models\|markov models]]. It allows updating probabilities based on new evidence.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1747033384/conditional%20probability-8ygfq6.webp)

Above illustration shows how $P(B\mid A) \ne P(A \mid B)$.
