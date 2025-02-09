---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[precomputation techniques\|precomputation techniques]]
> - [[combinatorics\|combinatorics]]

Calculating combinations (nCr) efficiently often requires factorials and their [[2 Zettels/modular multiplicative inverse\|modular multiplicative inverse]]. Precomputation comes handy when dealing with many queries.

The provided C++ code precomputes factorials and inverse factorials modulo a prime number (MOD).

1. **`modPow(a, b, mod)`:** Calculates `a^b % mod` efficiently using [[binary exponentiation\|binary exponentiation]]
2. **`precomputeFactorials()`:**
   - `fact[i]` stores i! % MOD. It's calculated iteratively: `fact[i] = fact[i-1] * i % MOD`
   - `invFact[i]` stores the modular inverse of i! -> i.e., $i!^{-1} \mod \text{MOD}$
   - It uses [[2 Zettels/fermat's little theorem\|fermat's little theorem]] to calculate `invFact[MAX]` as `fact[MAX]^(MOD-2) % MOD`
   - `invFact[i]` is then calculated iteratively in reverse: `invFact[i-1] = invFact[i] * i % MOD`.  This is because $\frac{1}{(i-1)!}=\frac{i}{i!}$

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int MOD = 1e9 + 7;
const int MAX = 1e6; // adjust as necessary

ll fact[MAX+1], invFact[MAX+1];

// Modular exponentiation
ll modPow(ll a, ll b, ll mod) {
    ll res = 1LL % mod;
    a %= mod;
    while(b > 0) {
        if(b & 1)
            res = (res * a) % mod;
        a = (a * a) % mod;
        b >>= 1;
    }
    return res;
}

void precomputeFactorials() {
    fact[0] = 1;
    for (int i = 1; i <= MAX; i++)
        fact[i] = (fact[i-1] * i) % MOD;

    invFact[MAX] = modPow(fact[MAX], MOD - 2, MOD);  // Fermat's Little Theorem
    for (int i = MAX; i >= 0; i--)
        invFact[i-1] = (invFact[i] * i) % MOD;
}
```

After calling `precomputeFactorials()`, you can calculate nCr % MOD as:
```cpp
ll nCr = ((fact[n] * invFact[r]) % MOD * invFact[n-r]) % MOD;
```

## Related
