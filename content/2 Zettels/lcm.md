---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[basic arithmetic\|basic arithmetic]]

**Formula**: `lcm(a, b) = a / gcd(a, b) * b` (prevents overflow).  
GCD can be computed using [[2 Zettels/euclid's algorithm\|euclid's algorithm]] or built-in `__gcd` (C++)

```cpp
int lcm(int a, int b) {
    return (a / gcd(a, b)) * b; // Order matters to avoid overflow
}
```

## Related
