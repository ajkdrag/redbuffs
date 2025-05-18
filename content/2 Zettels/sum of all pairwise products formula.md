---
{"publish":true,"created":"2025-02-19T11:30:14.198+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[basic arithmetic\|basic arithmetic]]

Given an array `a` of length `n`, find the sum of all pairwise products `a[i] × a[j]` for all pairs of indices `(i, j)` such that `i < j`. In other words, we need to calculate:

$$
\text{Total} = \sum_{i < j} a[i] \times a[j]
$$

Define:

$$
S = \sum_{i} a[i]
$$
Now, consider the square of this sum:
$$
S^2 = \left(\sum_{i} a[i]\right)^2
$$

Expanding $S^2$ gives:
$$
S^2 = \sum_{i} a[i]^2 + 2 \sum_{i < j} a[i] \times a[j]
$$

Rearrange this equation to solve for the sum of all pairwise products:

$$
\sum_{i < j} a[i] \times a[j] = S^2 - \sum_{i} a[i]^2
$$

Divide both sides by 2:

$$
\sum_{i < j} a[i] \times a[j] = \boxed{\frac{S^2 - \sum_{i} a[i]^2}{2}}
$$

### Intuition Behind the Formula

- $S^2$: This is the square of the sum of all elements. It naturally includes every possible product $a[i] \times a[j]$, but it also includes the squares $a[i]^2$ which we don't need
- Subtracting $\sum_{i} a[i]^2$: This removes the self-products (i.e., when i = j)
- **Division by 2**: Since every pair (i, j) appears twice in $S^2$ (once as $a[i] \times a[j]$ and once as $a[j] \times a[i]$), dividing by 2 gives the correct total

## Related
