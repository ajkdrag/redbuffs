---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[combinatorics\|combinatorics]]
> - [[modular arithmetic\|modular arithmetic]]

If we are asked to calculate permuatations/combinations modulo `m` (usually a prime $10^9 + 7$). We can first compute factorials mod m (numerator and denominator), and then find [[2 Zettels/modular multiplicative inverse\|modular multiplicative inverse]] of the denominator. This is needed to divide in modular arithmetic (division is done by multiplying by the inverse). It uses [[2 Zettels/fermat's little theorem\|fermat's little theorem]], which is valid only if `m` is prime.

> [!Note]
> **`binpow(a, b, m):`** This function efficiently calculates `(a^b) % m` using [[binary exponentiation\|binary exponentiation]]. It's much faster than repeatedly multiplying `a` by itself.

```python
def binpow(a, b, m):  # Modular exponentiation (a^b % m)
    a %= m
    res = 1%m
    while b > 0:
        if b & 1:  # If b is odd
            res = (res * a) % m
        a = (a * a) % m
        b >>= 1  # b = b // 2
    return res

def factorial(n, m):  # Factorial modulo m
    res = 1
    for i in range(1, n + 1):
        res = (res * i) % m
    return res

def modinv(n, m):  # Modular inverse using Fermat's Little Theorem (m must be prime)
    return binpow(n, m - 2, m)

def permutations(n, r, m): # P(n, r) % m
    num = factorial(n, m)
    den = factorial(n - r, m)
    inv_den = modinv(den, m)
    return (num * inv_den) % m

def combinations(n, r, m): # C(n, r) % m
    num = factorial(n, m)
    den1 = factorial(n - r, m)
    den2 = factorial(r, m)
    inv_den1 = modinv(den1, m)
    inv_den2 = modinv(den2, m)
    return ((num * inv_den2) % m * inv_den1) % m

```


If `m` isn't prime, then we can't use fermat's little theorem to get the mod inverse. In that case, we can use the [[2 Zettels/extended euclidean algorithm\|extended euclidean algorithm]]:

```python
def extended_gcd(a, b):
    if a == 0:
        return (b, 0, 1)
    d, x1, y1 = extended_gcd(b % a, a)
    x = y1 - (b // a) * x1
    y = x1
    return (d, x, y)

def modinv_non_prime(a, m):
    g, x, y = extended_gcd(a, m)
    if g != 1:
        raise Exception("Modular inverse does not exist")  # a and m are not coprime
    else:
        return (x % m + m) % m # Ensure positive result
```


## Related
