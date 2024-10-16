---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/weighting function in GloVe.md","permalink":"/2-zettels/weighting-function-in-glo-ve/","PassFrontmatter":true}
---


Topics: [[GloVe\|GloVe]]
Links:

In the [[2 Zettels/GloVe objective function\|GloVe objective function]], we have a weighting function which should have the following properties:

- $f(0) = 0$ and this makes sure we don't run into $\log(0)$ undefined problems in the cost function when $X_{ij}=0$
- If $f$ is viewed as a continuous function, it should vanish as x → 0 fast enough so that the value is finite
- $f(x)$ should be non-decreasing so that rare co-occurrences are not over-weighted
	- Example: Let's say we have "the" and "cat": 1000 times; "quantum" and "physics": 50 times; "purple" and "banana": 2 times. A *decreasing* $f(x)$ where $f(1000) < f(50) < f(2)$ will make the common pair "the cat" *contribute less* to the learning process than the rare pair "purple banana"
- Similarly, $f(x)$ should be relatively small for large values of x, so that frequent co-occurrences are not over-weighted

The below function — an extension of the clipped [Power Law function](https://en.wikipedia.org/wiki/Power_law) satisfies above properties and used in GloVe.
$$
\begin{aligned}
f(x) &= 
\begin{cases} 
(x/x_{\text{max}})^\alpha & \text{if } x < x_{\text{max}} \\
1 & \text{otherwise}
\end{cases} \\[10pt]
\text{where:} \\
f(x) &: \text{the weighting function} \\
x &: \text{the co-occurrence count} \\
x_{\text{max}} &: \text{a hyperparameter, typically set to 100} \\
\alpha &: \text{a hyperparameter, typically set to 3/4}
\end{aligned}
$$

![](https://res.cloudinary.com/dcameztw9/image/upload/v1727693779/o90jtvgwy4ifzp8qxe8i.png)
