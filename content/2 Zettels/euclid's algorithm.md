---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[modular arithmetic\|modular arithmetic]]
> - [[divisibility\|divisibility]]

It efficiently computes the Greatest Common Divisor (GCD) and has variations crucial for solving complex problems.

> `gcd(a, b) = gcd(b, a % b)` until `b = 0`.

3 popular variants:
- [[2 Zettels/standard euclidean algorithm\|standard euclidean algorithm]]
- [[2 Zettels/extended euclidean algorithm\|extended euclidean algorithm]]
- [[2 Zettels/binary gcd\|binary gcd]] aka Stein's algorithm

The applications are plenty:
- Finding [[2 Zettels/modular multiplicative inverse\|modular multiplicative inverse]]
- Solving [[2 Zettels/linear diophantine equations\|linear diophantine equations]]
- Chinese Remainder Theorem (CRT)
- Simplifying fractions by dividing numerator and denominator by their GCD

> [!Tip]
> In array GCD, exit early if intermediate GCD becomes 1.

## Related
