---
{"publish":true,"created":"2025-02-03T14:25:04.041+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[modular arithmetic\|modular arithmetic]]
> - [[divisibility\|divisibility]]

We saw that `gcd(a, m) = 1` is necessary for [[2 Zettels/modular multiplicative inverse\|modular multiplicative inverse]] to exist. Let's assume, for the sake of contradiction, that `gcd(a, m) = d > 1`. This means that `d` divides both `a` and `m`. We can write this as:

- `a = d * k` for some integer `k`
- `m = d * l` for some integer `l`

Now, suppose a modular inverse `x` exists. This means: `a * x ≡ 1 (mod m)`. This congruence can be rewritten as an equation:

`a * x = 1 + m * y` for some integer `y` 

Substituting our expressions for `a` and `m`:

`=> (d * k) * x = 1 + (d * l) * y`
`=> d * (k * x) = 1 + d * (l * y)`
`=> d * (k * x - l * y) = 1`

Since `k`, `x`, `l`, and `y` are all integers, the expression `(k * x - l * y)` is also an integer. Let's call this integer `z`:

`=> d * z = 1`

This equation states that `d` divides 1. However, we initially assumed that `d > 1`. This creates a contradiction. Therefore, our initial assumption that `gcd(a, m) = d > 1` must be false, as shown through this [[proof by contradiction\|proof by contradiction]].

> Therefore, for a modular inverse to exist, it is necessary that `gcd(a, m) = 1`.

## Related
- [[2 Zettels/extended euclidean algorithm\|extended euclidean algorithm]]