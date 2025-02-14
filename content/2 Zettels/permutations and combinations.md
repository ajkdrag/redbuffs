---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[combinatorics\|combinatorics]]

Permutations:
- **Definition:** Arrangements where the order matters
- **Formula:** The number of ways to arrange r items out of n is given by $P(n, r) = \frac{n!}{(n-r)!}$​

Combinations:
- **Definition:** Selections of objects where order doesn't matter
- **Formula:** Number of ways to choose r objects from a set of n distinct object $C(n, r) = \frac{n!}{r!(n-r)!}$. Also called as [[binomial coefficient\|binomial coefficient]]

```python
import math

def permutations(n, r):
    return math.factorial(n) // math.factorial(n - r)

def combinations(n, r):
    return math.factorial(n) // (math.factorial(r) * math.factorial(n - r))

```

> [!Example] Number of ways to reach `(m, n)`
> Starting at (0, 0), number of ways, if allowed to move only left and up will be: `C(m+n,m)`. This is because every path you take will consist of exactly `m` moves to the right (R) and `n` moves up (U). The total number of moves will always be `m + n`. 
> 
> The problem boils down to figuring out how many ways you can arrange these `m` (R) moves and `n` (U) moves, i.e. choose `m` out of the total `m+n` moves to place the (R) moves, the remaining `n` positions must be the (U) moves.

## Related
