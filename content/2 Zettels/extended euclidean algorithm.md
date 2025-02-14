---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[2 Zettels/euclid's algorithm\|euclid's algorithm]]
> - [[recursion\|recursion]]
> - [[2 Zettels/linear diophantine equations\|linear diophantine equations]]

**Purpose**: Find integers `x, y` such that `ax + by = gcd(a, b)`.  `x` and `y` are also called the coefficients of [[2 Zettels/bezout's identity\|bezout's identity]].
**Applications**: [[2 Zettels/modular multiplicative inverse\|modular multiplicative inverse]], cryptography etc

The algorithm builds solutions incrementally, using smaller subproblems to construct the final answer. This recursive approach mirrors the natural structure of the [[2 Zettels/standard euclidean algorithm\|standard euclidean algorithm]] (GCD computation).

### Base Case
When we reach `gcd(a, 0)`, the solution is straightforward:
- The GCD is simply `a`
- The coefficients are `x = 1` and `y = 0`
- This satisfies the equation: `a * 1 + 0 * 0 = a`

### Recursive Step
> At each stage, we transform the problem `gcd(a, b)` into the smaller problem `gcd(b, a % b)`. The magic lies in how we reconstruct the solution for the original problem from the solution of the smaller one.

Given coefficients `x1` and `y1` for the smaller problem:
```
b * x1 + (a % b) * y1 = gcd(b, a % b) = gcd(a, b)
```

We can substitute `a % b = a - (a // b) * b`:
```
b * x1 + (a - (a // b) * b) * y1 = gcd(a, b)
```

Rearranging reveals our solution:
```
a * y1 + b * (x1 - (a // b) * y1) = gcd(a, b)
```

Therefore:
- `x = y1`
- `y = x1 - (a // b) * y1`

Implementation is straightforward:
```python
def extended_gcd(a, b):
    if b == 0:
        return (a, 1, 0)  # Base case
    else:
        gcd, x1, y1 = extended_gcd(b, a % b)
        x = y1
        y = x1 - (a // b) * y1
        return (gcd, x, y)
```

This recursive implementation captures the algorithm's essence: each step builds upon the solution of a simpler case until we reach the base case, then reconstructs the complete solution as we return through the call stack.

**Time complexity:** $O(\log (\min(a, b)))$
**Space complexity:** $O(1)$

## Related
- [[2 Zettels/iterative version of extended euclidean algorithm\|iterative version of extended euclidean algorithm]]
