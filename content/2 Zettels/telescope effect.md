---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-03-20T20:50:10.105+05:30"}
---


> [!Topics]
> - [[basic arithmetic\|basic arithmetic]]

The telescope effect, also known as a telescoping sum, is a series where many terms cancel out, leaving only a few terms. This significantly simplifies the expression being evaluated. It's analogous to how a telescope collapses into a much smaller, manageable size.

## Explanation

The core idea behind the telescope effect is the cancellation of intermediate terms in a sum or product.  This usually takes the form of:
$$
(a_1 - a_2) + (a_2 - a_3) + (a_3 - a_4) + ... + (a_{n-1} - a_n)
$$
Notice how the `-a_2` cancels with the `+a_2`, `-a_3` with `+a_3`, and so on. The only terms that survive are `a_1` and `-a_n`, leading to a simplified result of `a_1 - a_n`.

## Applications

-  [[2 Zettels/difference arrays\|difference arrays]]:
    - The reconstruction of the original array from a difference array is a direct application of the telescoping effect. The intermediate terms cancel out when taking prefix sums
-  [[2 Zettels/hockey-stick identity\|hockey-stick identity]]:
    - The hockey-stick identity in combinatorics leverages the telescoping effect to simplify the summation of binomial coefficients
- **Partial Fraction Decomposition:**
    - Consider $\sum_{i=1}^n \frac{1}{i(i+1)}.$ Using [[2 Zettels/partial fractions\|partial fractions]], the summand equals $\frac{1}{i} - \frac{1}{i+1}$
    - Thus, the sum is equal to $(1-\frac{1}{2}) + (\frac{1}{2} - \frac{1}{3}) + ... + (\frac{1}{n} - \frac{1}{n+1}) = 1 - \frac{1}{n+1}$

## Related