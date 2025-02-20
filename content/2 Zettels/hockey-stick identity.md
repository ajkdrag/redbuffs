---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[2 Zettels/pascal's triangle\|pascal's triangle]]

The Hockey Stick Identity is a combinatorial identity that states:

$$
C(r, r) + C(r+1, r) + C(r+2, r) + \dots + C(n, r) = C(n+1, r+1)
$$

Here:
- $C(n, k)$ is the [[binomial coefficient\|binomial coefficient]]
- The left-hand side (LHS) is the sum of binomial coefficients along a diagonal in Pascal’s Triangle.
- The right-hand side (RHS) is a single binomial coefficient.

Alternatively, it's written as:
$$
\begin{align*}
\sum_{k=r}^n \binom{k}{r} = \binom{n+1}{r+1} \\
\sum_{k=0}^{n-r} \binom{r+k}{r} = \binom{n+1}{r+1} \\
\sum_{k=0}^{n-r} \binom{r+k}{k} = \binom{n+1}{r+1}
\end{align*}
$$

Replacing $n$ with $n+r$ in the last expression gives us the following equivalent identities, but whose "range" is from $r$ to $n+r$ (instead of $n$ previously):
$$
\begin{align*}
\sum_{k=0}^{n} \binom{r+k}{k} = \binom{n+r+1}{r+1} \\
\sum_{k=0}^{n} \binom{r+k}{k} = \binom{n+r+1}{n}
\end{align*}
$$

### Relation to Pascal's Triangle
In Pascal's Triangle, the Hockey Stick Identity corresponds to summing elements along a diagonal. For example:

![](https://res.cloudinary.com/dcameztw9/image/upload/v1738930859/hockey-stick%20identity-r7mmmx.webp)


If we choose $r = 2$, the sum of the diagonal $C(2, 2) + C(3, 2) + C(4, 2)$ is:

$$
C(2, 2) + C(3, 2) + C(4, 2) = 1 + 3 + 6 = 10
$$

According to the Hockey Stick Identity, this sum equals $C(5, 3)$:

$$
C(5, 3) = 10
$$

This matches the sum of the diagonal. The identity arises from the **additive property** of Pascal's Triangle, where each entry is the sum of the two entries above it:

$$
C(n, k) = C(n-1, k-1) + C(n-1, k)
$$

When you sum along a diagonal, this additive property ensures that the sum [[telescope effect\|telescopes]] to a single binomial coefficient. For example:
    
$$
\begin{align*}
C(2,2)&=C(3,3) \\
C(3,2)&=C(4,3) - C(3,3) \\
C(4,2)&=C(5,3) - C(4,3)
\end{align*}
$$
Adding these up cancels out intermediate terms, leaving only $C(5,3)$.

> [!Note]
> There are several ways to prove the identity: [[2 Zettels/hockey-stick identity committee building proof\|proof 1]], [[2 Zettels/hockey-stick identity stars and bars proof\|proof 2]] (both leverage the [[2 Zettels/double counting\|double counting]] principle).

## Related