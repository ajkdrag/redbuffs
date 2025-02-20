---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-02-03T14:00:19.340+05:30"}
---


> [!Topics]
> - [[modular arithmetic\|modular arithmetic]]
> - [[exponentiation\|exponentiation]]

**Problem**: Find `x` (aka $a^{-1}$) such that `a*x ≡ 1 (mod m)`.
**Solution**: Use [[2 Zettels/extended euclidean algorithm\|extended euclidean algorithm]]. [[2 Zettels/modular multiplicative inverse existence condition\|Inverse exists]] iff `gcd(a, m) = 1` (coprime). If `m` is prime, simply use [[2 Zettels/fermat's little theorem\|fermat's little theorem]] to get inverse as: $a^{m-2} \bmod m$ .

> [!Note]
> The problem of finding a modular inverse is a special case of solving a **linear congruence** of the form `ax ≡ b (mod m)`. When `b = 1`, we have the modular inverse problem.

Relation with [[2 Zettels/bezout's identity\|bezout's identity]] is obvious if we simplify: `a*x ≡ 1 (mod m) => a*x - m*y = 1`. Note that we ignore the `y` and just keep the `x` (it's common to make it positive).

```cpp
int mod_inverse(int a, int m) {
    int x, y;
    int g = extended_gcd(a, m, x, y);
    if (g != 1) return -1; // No inverse
    return (x % m + m) % m; // Ensure positive
}
```

**Applications:** 
- Cryptography: RSA algorithm relies heavily on modular inverses. 
- Solving Linear Congruences: The equation `a*x ≡ b (mod m)` can be solved by multiplying both sides by the modular inverse of `a`
- Hashing: Some hashing algorithms use modular arithmetic and thus may implicitly use modular inverses.

## Related
