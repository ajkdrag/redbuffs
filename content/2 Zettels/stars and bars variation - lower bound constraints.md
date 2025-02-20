---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-02-05T19:34:38.608+05:30"}
---


> [!Topics]
> - [[combinatorics\|combinatorics]]

In standard [[2 Zettels/stars and bars method\|stars and bars method]], we distribute `n` identical objects into `k` distinct bins. The formula comes out to be: `comb(n+k-1, k-1)`. A variation of this problem can be: 

### Minimum Constraints (At Least One in Each Bin)
> What if each bin (kid) must get **at least one** object?
> - Instead of distributing `n` objects, first **give 1** to each bin
> - We now have `n-k` objects left to distribute freely

**Modified formula:**
$$
\text{Ways} = {(n-k)+k-1 \choose k-1} = {n-1 \choose k-1}​
$$

> [!Note]
> This can be generalized to atleast $a_i$ objects for kid $a$. In this case, give min items to each kid => remainder is $n-\sum_{i}a_i$ which needs to be distributed to the kids.

## Related
