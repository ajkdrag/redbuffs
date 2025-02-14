---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[2 Zettels/derangements\|derangements]]
> - [[recursion\|recursion]]

A derangement is a permutation with no fixed points. We can derive a recurrence as follows:

   - Consider the [[2 Zettels/derangement direct formula\|derangement direct formula]], i.e. $D(n)$:
     $$
     D(n) = n! \sum_{k=0}^n \frac{(-1)^k}{k!}
     $$
   - Multiply $D(n-1)$ by $n$:
     $$
     n D(n-1) = n \cdot (n-1)! \sum_{k=0}^{n-1} \frac{(-1)^k}{k!} = n! \sum_{k=0}^{n-1} \frac{(-1)^k}{k!}
     $$
   - Adding $(-1)^n$ to both sides:
     $$
     n D(n-1) + (-1)^n = n! \sum_{k=0}^{n-1} \frac{(-1)^k}{k!} + (-1)^n
     $$
   - Notice that:
     $$
     D(n) = n! \sum_{k=0}^n \frac{(-1)^k}{k!} = n! \left( \sum_{k=0}^{n-1} \frac{(-1)^k}{k!} + \frac{(-1)^n}{n!} \right)
     $$
   - Simplifying the right-hand side:
     $$
     D(n) = n! \sum_{k=0}^{n-1} \frac{(-1)^k}{k!} + (-1)^n
     $$
   - Therefore, we have:
     $$
     \boxed{D(n) = n D(n-1) + (-1)^n}
     $$

Below code is what's preferred to use in [[competitive programming\|competitive programming]]

```cpp
int derangement_recursive(int n, long long mod) {
    if (n == 0) {
        return 1; // base case
    }
    long long c = derangement(n - 1, mod);
    c = n * c + (n % 2 == 1 ? -1 : 1);
    return (c + mod)%mod;
}

int derangement_iterative(int n, long long mod) {
    long long c = 1; // base case
    for (int i = 1; i <= n; ++i){
        c = (c * i) + (i % 2 == 1 ? -1 : 1);
        c = (c + mod)%mod; // +mod to handle neg vals as well
    }
    return c;
}
```


## Related
