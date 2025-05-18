---
{"publish":true,"created":"2025-02-06T12:32:58.073+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[2 Zettels/derangements\|derangements]]
> - [[inclusion-exclusion principle\|inclusion-exclusion principle]]

The direct formula for derangements:

$$n!\sum_{k=0}^{n} \frac{(-1)^k}{k!}$$

> It is derived using the Inclusion-Exclusion Principle (IEP)

We need to count the number of ways to permute n elements such that no element appears in its original position.

Total ways to arrange n elements (**without constraints**) = $n!$

But we must **remove cases where one or more elements stay fixed**. This is where Inclusion-Exclusion comes in!

1. Total ways to arrange n elements (ignoring restrictions): $n!$
2. **Subtract cases where at least one element stays in its original position**:
    - Pick **one** element that remains fixed → Permute the remaining n-1 elements.
    - Ways to do this: $(n−1)!$
    - Since **any of the n elements could be fixed**, multiply by n: $-n \times (n-1)! = -n!$
3. **Add back cases where at least two elements remain fixed** (over-subtracted before):
    - Choose **two** elements to stay fixed.
    - The remaining n-2 elements are freely permuted.
    - Ways to do this: $(n-2)!$
    - Ways to pick the 2 fixed elements: $\binom{n}{2} = \frac{n(n-1)}{2}$
    - So, the contribution is: $+ \frac{n(n-1)}{2} \times (n-2)! = \frac{n!}{2!}$
4. **Subtract cases where at least three elements remain fixed**:
    - Choose **three** elements to stay fixed.
    - The remaining n-3 elements are freely permuted.
    - Ways to do this: $(n-3)!$
    - Ways to pick the 3 fixed elements: $\binom{n}{3} = \frac{n(n-1)(n-2)}{3!}$
    - So, the contribution is: $- \frac{n(n-1)(n-2)}{3!} \times (n-3)!= -\frac{n!}{3!}$
5. **Continue this process until all elements are fixed**:
    - Every term alternates **(adding and subtracting)**
    - The general term follows: $(-1)^k \times \frac{n!}{k!}$
    - Summing over all possible values of k, we get the final formula:
        $D(n) = n! \sum_{k=0}^{n} \frac{(-1)^k}{k!}$

> [!Tip]
> For large n, $D(n)$ approaches $\frac{n!}{e}$ (since the sum approaches $\frac{1}{e}$)

```cpp
#include <iostream>
#include <vector>

using namespace std;

long long power(long long base, long long exp, long long mod) {
    long long res = 1 % mod;
    base %= mod;
    while (exp > 0) {
        if (exp % 2 == 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp /= 2;
    }
    return res;
}

long long modInverse(long long n, long long mod) {
    return power(n, mod - 2, mod);
}

long long derangement(int n, long long mod) {
    vector<long long> fact(n + 1);
    fact[0] = 1;

    long long result = 1; // for k = 0: (-1)^0 / 0! = 1

    for (int k = 1; k <= n; ++k) {
        fact[k] = (fact[k - 1] * k) % mod; // calc factorial
        long long term = modInverse(fact[k], mod); // calc inverse

        if (k % 2 == 0) {
            result = (result + term) % mod;
        } else {
            result = (result - term + mod) % mod; // +mod to handle negative results
        }
    }

    result = (result * fact[n]) % mod;
    return result;
}

int main() {
    int n;
    long long mod = 1e9 + 7;

    cin >> n;
    cout << derangement(n, mod) << endl;

    return 0;
}
```

## Related
- [[2 Zettels/derangement recurrence\|derangement recurrence]]