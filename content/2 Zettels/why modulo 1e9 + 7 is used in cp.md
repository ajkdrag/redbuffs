---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-01-09T13:34:55.796+05:30"}
---


> [!Topics]
>
> - [[competitive programming\|competitive programming]]
> - [[modular arithmetic\|modular arithmetic]]

**Why 10^9+7 ?**

- It's prime and primes have least "collision"
    - Chances for 2 numbers to have same value after mod, when $m$ is prime is lower than when $m$ is non-prime
- It's the _first prime_ after $10^9$
- Sum of 2 nums $a$ and $b$ will fit in `int` under modulo
    - `a%m + b%m` fits under `int` datatype
- Product of $a$ and $b$ fits in `long long` under modulo
    - `(a%m) * (b%m)` fits under `long long` datatype
- Taking modulo is a nice way to prevent overflows

## Related
