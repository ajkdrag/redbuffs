---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-02-05T12:48:43.690+05:30"}
---


> [!Topics]
> - [[algorithmic paradigm\|algorithmic paradigm]]
> - [[combinatorics\|combinatorics]]

> Fundamental combinatorial technique used to count the number of ways to distribute **identical objects** (start) into **distinct bins** (separated by bars).

For example, distributing 5 identical objects into 3 distinct bins:
```
⭐⭐ | ⭐⭐ | ⭐   (Bin 1 gets 2, Bin 2 gets 2, Bin 3 gets 1)
⭐⭐⭐ | |⭐⭐  (Bin 1 gets 3, Bin 2 gets 0, Bin 3 gets 2)
```

Since there are n objects, we need to place `k-1` bars among them to separate them into `k` groups. Thus, we have `n + k - 1` empty slots. We need to choose `n` of those slots to put stars (the items). Once we've chosen the star slots, the remaining slots *must* be filled with bars to divide the bins. There are `C(n + k - 1, n)` ways to choose the star slots.

$$
\text{Ways} = {n+k-1 \choose k-1} =\frac{(n+k-1)!}{n!(k-1)!}
$$

```python
def stars_bars(n, k):
    return comb(n + k - 1, k - 1)  # Using precomputed comb(n, r)
```

> [!Example]
> **Problem**: Number of ways to partition a number N into K non-negative integers.
> **Solution**: This problem is a perfect fit for the stars and bars method.
> - **Stars:** The N stars represent the total value we want to partition
> - **Bars:** The K-1 bars divide the stars into K groups, representing the K parts of the partition

**Variations**
- [[2 Zettels/stars and bars variation - lower bound constraints\|stars and bars variation - lower bound constraints]]
- [[2 Zettels/stars and bars variation - upper bound constraints\|stars and bars variation - upper bound constraints]]

## Related
