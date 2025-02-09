---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[2 Zettels/euclid's algorithm\|euclid's algorithm]]
> - [[divisibility\|divisibility]]
> - [[recursion\|recursion]]

**Purpose**: Compute GCD of two integers.
**Key Insight**:  `gcd(a, b) = gcd(b, a % b)` until `b = 0`.  
**Time Complexity**: `O(log(min(a, b)))`.

```cpp
// Recursive
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

// Iterative (preferred for CP)
int gcd(int a, int b) {
    a = abs(a), b = abs(b); // ignore negatives (handled by caller)
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}
```


## Related
