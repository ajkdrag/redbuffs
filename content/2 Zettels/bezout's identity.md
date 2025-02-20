---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-02-03T14:16:57.237+05:30"}
---


> [!Topics]
> - [[divisibility\|divisibility]]
> - [[2 Zettels/linear diophantine equations\|linear diophantine equations]]

For any integers `a` and `b`, there exist integers `x` and `y` such that `a*x + b*y = gcd(a, b)`. When `gcd(a, b) = 1`, Bezout's identity guarantees the existence of `x` and `y` that satisfy the equation, and `x` becomes the [[2 Zettels/modular multiplicative inverse\|modular multiplicative inverse]] of `a`.

> [!Note]
> The [[2 Zettels/extended euclidean algorithm\|extended euclidean algorithm]] is the practical way to apply Bézout's Identity.
> - **Input:** Two integers `a` and `b`.
> - **Output:** `gcd(a, b)`, and integers `x` and `y` such that `ax + by = gcd(a, b)`.

## Related
