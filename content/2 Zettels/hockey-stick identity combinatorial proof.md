---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[2 Zettels/hockey-stick identity\|hockey-stick identity]]

The Hockey Stick Identity can be proven using a combinatorial argument based on distributing candies to children. Consider the following scenario:

We have `n` indistinguishable candies to distribute among `k` distinguishable children. This distribution can be counted in two different ways:

1. **Direct Counting**: Using the [[2 Zettels/stars and bars method\|stars and bars method]], we know there are $\binom{n+k-1}{k-1}$ ways to distribute n indistinguishable objects into k distinguishable groups.
2. **Alternative Counting**: We can also count this by first deciding how many candies (call it i) to give to the first child:
   - For each choice of i candies (where $0 \leq i \leq n$) given to the first child
   - We then distribute the remaining n-i candies to k-1 children
   - By stars and bars, this gives $\binom{n+k-2-i}{k-2}$ ways for each i
   - Summing over all possible i gives us: $\sum_{i=0}^n\binom{n+k-2-i}{k-2}$

By the principle of [[2 Zettels/double counting\|double counting]], these must be equal:
$$
\binom{n+k-1}{k-1} = \sum_{i=0}^n\binom{n+k-2-i}{k-2}
$$

To transform this into our Hockey Stick Identity, we make the substitutions:
- Let $n' = n+k-2$ 
- Let $r = k-2$

Noting that $n'-n = k-2 = r$, we get:

$$\binom{n'+1}{r+1} = \sum_{i=0}^n \binom{n'-i}{r} = \sum_{i=r}^{n'} \binom{i}{r}$$

## Related
