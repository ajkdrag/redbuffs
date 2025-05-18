---
{"publish":true,"created":"2025-02-05T19:38:45.942+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[combinatorics\|combinatorics]]

In standard [[2 Zettels/stars and bars method\|stars and bars method]], we distribute `n` identical objects into `k` distinct bins. The formula comes out to be: `comb(n+k-1, k-1)`. A variation of this problem can be: 

### Bounded Distributions (Upper Limits)

> What if a bin **cannot exceed a maximum number**?

This equires a modified combinatorial approach, often involving [[inclusion-exclusion principle\|inclusion-exclusion principle]]. E.g.: Distribute 20 candies to 4 kids, but each gets at most 7:
- Count **unrestricted** ways (regular stars and bars): C(20+4−1, 4−1) = C(23, 3) = 1771
- Then, subtract cases where one or more kids exceed the limit

This subtraction (i.e. the inclusion-exclusion) part is done as follows:
- Subtract cases where at least one kid gets 8+ candies
    - Pick one kid in 4 ways
    - Give him 8 candies first, leaving 20-8=12 candies to distribute among all 4 kids
    - This ensures that one kid always has 8+ candies
- Add back cases where two kids get 8+ candies (over-subtracted before)
    - In the previous case, we subtracted few cases TWICE, instead of just once: E.g.`[8, 8, 4, 0]` where if we pick kid1 or kid2 and give him 8 candies, we somehow end up with the same arrangement
- Subtract cases where three kids get 8+ candies
    - In this example, it's not possible since 8+8+8=24 > 20
- ... so on

Mathematically,
$$
\sum_{i=0}^m (-1)^i \dbinom{k}{i} \dbinom{n - i(c + 1) + k - 1}{k - 1}
$$

- `m = n // (c + 1)`: maximum number of kids that can violate the upper bound
- **$(-1)^i$**: Alternating sign for inclusion-exclusion
- **First term**: Choose `i` bins to violate the constraint (each gets at least `c + 1` items)
- **Second term**: Distribute the remaining `n - i(c + 1)` items into `k` bins (no constraints)

In code, [[2 Zettels/precomputing factorials and inverse factorials\|precomputing factorials and inverse factorials]] is done for easy calculation of $n \choose r$

```python
MOD = 10**9 + 7

def comb(n, r):
    if n < r or r < 0: return 0
    return fact[n] * inv_fact[r] % MOD * inv_fact[n - r] % MOD

def stars_and_bars_upper_bound(n, k, c):
    ans = 0
    m = n // (c + 1)
    for i in range(0, m + 1):
        term = comb(k, i) * comb(n - i * (c + 1) + k - 1, k - 1)
        if i % 2 == 0:
            ans += term
        else:
            ans -= term
        ans %= MOD
    return ans
```

## Related
