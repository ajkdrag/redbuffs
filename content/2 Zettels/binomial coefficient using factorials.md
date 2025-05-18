---
{"publish":true,"created":"2025-02-04T20:34:08.396+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[combinatorics\|combinatorics]]
> - [[modular arithmetic\|modular arithmetic]]

When computing [[binomial coefficient\|binomial coefficient]] ([[2 Zettels/permutations and combinations\|permutations and combinations]]), we have two primary approaches:

1. **Dynamic Programming Approach** - Uses [[2 Zettels/binomial coefficient recursive relation\|the recursive relation]]:
    - $C(n, r) = C(n-1, r-1) + C(n-1, r)$
    - Time Complexity: $O(n^2)$
    - Space Complexity: $O(n^2)$ (can be optimized to $O(n)$)
2. **Factorial-Based Approach** - Uses the formula:
    - $C(n, r) = \frac{n!}{r!(n-r)!}$
    - Time Complexity: $O(n)$ (for factorials)
    - Space Complexity: $O(1)$

The factorial-based approach is significantly faster than DP. However, factorials grow exponentially, so we compute [[2 Zettels/why modulo 1e9 + 7 is used in cp\|results modulo a prime]] `m`, typically $10^9+7$.

### Modular Arithmetic for Efficient Computation

Since direct division is not possible in modular arithmetic, we compute the [[2 Zettels/modular multiplicative inverse\|modular multiplicative inverse]] of the denominator using [[2 Zettels/fermat's little theorem\|fermat's little theorem]] if `m` is prime:

- **Fermat's Theorem:** $a^{m-1} \equiv 1 \pmod{m}$
- Rearranged for modular inverse: $a^{-1} \equiv a^{m-2} \pmod{m}$
- Computed efficiently using [[binary exponentiation\|binary exponentiation]] $O(\log m)$

**Binary Exponentiation for Fast Powering**

```python
def binpow(a, b, m):  # Computes (a^b) % m efficiently
    a %= m
    res = 1%m
    while b > 0:
        if b & 1:
            res = (res * a) % m
        a = (a * a) % m
        b >>= 1
    return res
```

**Factorial and Modular Inverse Calculation**

```python
def factorial(n, m):  # Computes n! % m
    res = 1
    for i in range(1, n + 1):
        res = (res * i) % m
    return res

def modinv(n, m):  # Computes modular inverse using Fermat's Theorem
    return binpow(n, m - 2, m)
```
- Time complexity: $O(n) + O(\log m)$
- Space complexity: $O(1)$

**Computing Permutations and Combinations Efficiently**

```python
def permutations(n, r, m):
    num = factorial(n, m)
    den = factorial(n - r, m)
    inv_den = modinv(den, m)
    return (num * inv_den) % m

def combinations(n, r, m):
    num = factorial(n, m)
    den1 = factorial(n - r, m)
    den2 = factorial(r, m)
    inv_den1 = modinv(den1, m)
    inv_den2 = modinv(den2, m)
    return ((num * inv_den2) % m * inv_den1) % m
```

- Time Complexity: $O(n + \log m)$
- Space Complexity: $O(1)$

**Handling Non-Prime Moduli using Extended Euclidean Algorithm**

If $m$ is not prime, Fermat's theorem is invalid. Instead, we use the [[2 Zettels/extended euclidean algorithm\|extended euclidean algorithm]] to compute the modular inverse:

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
        raise Exception("Modular inverse does not exist")  # a and m must be coprime
    else:
        return (x % m + m) % m  # Ensure positive result
```

- Time Complexity: $O(\log (\min(a, m)))$

**Optimized Approach using Precomputed Factorials and Inverses**

To answer multiple queries efficiently, we [[2 Zettels/precomputing factorials and inverse factorials\|precomputing factorials and inverse factorials]] up to $n$:

```python
def precompute_factorials(n, m):
    fact = [1] * (n + 1)
    inv_fact = [1] * (n + 1)
    
    for i in range(2, n + 1):
        fact[i] = (fact[i-1] * i) % m
    
    inv_fact[n] = modinv(fact[n], m)  # Compute inverse of n! first
    for i in range(n-1, 0, -1):
        inv_fact[i] = (inv_fact[i + 1] * (i + 1)) % m
    
    return fact, inv_fact

def comb_precomputed(n, r, m, fact, inv_fact):
    return ((fact[n] * inv_fact[r]) % m * inv_fact[n - r]) % m
```

- **Precomputation Time Complexity:** $O(n)$
- **Query Time Complexity:** $O(1)$
- **Space Complexity:** $O(n)$

## Related
- [[2 Zettels/binomial coefficient using dp\|binomial coefficient using dp]]
- [[2 Zettels/binomial coefficient without factorials in linear time\|binomial coefficient without factorials in linear time]]