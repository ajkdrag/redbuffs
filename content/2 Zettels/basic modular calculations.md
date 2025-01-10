---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[modular arithmetic\|modular arithmetic]]

```cpp
int mod_add(int a, int b, int m) {
    return (a % m + b % m) % m;
}

int mod_sub(int a, int b, int m) {
    // during subtraction, value can get negative,
    // so we add extra `m` to ensure positive output
    return (a % m - b % m + m) % m;
}

int mod_mul(int a, int b, int m) {
    return (a % m * b % m) % m;
}
```

Adding, subtraction and multiplication is trivial under modulo. 

> [!Warning]
> Care should be taken during subtraction in C++, to make sure we don't output negative values. Example: `-13 % 5 = -3`, but we should do `(-13 % 5 + 5) = 2` to get the correct positive value.

## Related
