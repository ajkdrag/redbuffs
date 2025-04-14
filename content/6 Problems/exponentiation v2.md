---
{"publish":true,"tags":["type/problem"],"platform":"AlgoZenith","link":null,"PassFrontmatter":true,"created":"2025-02-16T14:18:56.535+05:30"}
---


> [!Topics]
>
> - [[modular arithmetic\|modular arithmetic]]

You are given four integers: $A, B, C$, and $P$. $P$ is a prime number. Find $A^{B ^ C} \% P$. Note that $0^0 = 1$. Example: $2 ^ {4 ^ 2} \% 7 = 2^{16} \% 7 = 65536 \% 7 = 2$

## Idea

The edge cases which we need to take care of are as follows

1. If $(B^C)=0$ i.e., $B=0$ and $C \neq 0$, then answer is $1$.
2. If $A=0$ and $(B^C) \neq 0$ , then answer is 0.
3. If $A \neq 0$ and $(B^C) \neq 0$ , and $A$ is divisible by $P$, then answer is $0$.
4. If $A \neq 0$ and $(B^C) \neq 0$ , and $A$ is not divisible by $P$, then we need to use [[2 Zettels/fermat's little theorem\|fermat's little theorem]] which states that $A^{P-1} =1\mod P$, if $P$ is prime.

Let $(B^C) = X \times(P-1)+Y$ , which means that $A^{B^C} = A^{(P-1)^X} A^Y$ which simplifies to $A^Y$ modulo $P$, due to fermat's little theorem application on the first part.

> Thus, find $Y=(B^C)(\bmod P-1)$ and then find $A^Y(\bmod P)$. These can solved using [[binary exponentiation\|binary exponentiation]] (recursive or iterative versions).

**Time Complexity** per test case: $O(\log C + \log P)$

## Code

```cpp
ll binpow(ll a, ll b, ll mod) {
  if (b == 0)
    return 1;
  if (b == 1)
    return a % mod;
  ll temp = binpow(a, b >> 1, mod);
  ll tres = (temp * temp) % mod;
  if (b & 1)
    tres = (tres * a) % mod;
  return tres;
}

void solve() {
  ll a, b, c, p;

  cin >> a >> b >> c >> p;

  if (a % p == 0) {
    if (b == 0 and c != 0)
      cout << 1 << endl;
    else
      cout << 0 << endl;
    return;
  }
  if (a == 0 and b != 0) {
    cout << 0 << endl;
    return;
  }
  ll tres = binpow(b, c, p - 1);
  ll res = binpow(a, tres, p);
  cout << res << endl;
}

```

## Related
