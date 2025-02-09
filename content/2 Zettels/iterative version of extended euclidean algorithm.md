---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[2 Zettels/euclid's algorithm\|euclid's algorithm]]

The iterative implementation of the Extended Euclidean Algorithm centers around maintaining and updating coefficients that express intermediate values in terms of the original inputs. 

> At each step, we **maintain coefficients** that express current values as linear combinations of the original inputs:

```
a = x₀ × original_a + y₀ × original_b
b = x₁ × original_a + y₁ × original_b
```

## Understanding Coefficient Updates

When performing the Euclidean step `a, b = b, a % b`, the values change in a way that requires careful coefficient tracking to maintain their relationship to the original inputs.

### Initial State
- Begin with `a = original_a` and `b = original_b`
- Initial coefficients:
  - For a: `x₀ = 1, y₀ = 0` (since `a = 1 × original_a + 0 × original_b`)
  - For b: `x₁ = 0, y₁ = 1` (since `b = 0 × original_a + 1 × original_b`)

### Coefficient Update Derivation
After each step `a, b = b, a % b`:

1. The new `a` becomes the old `b`, so:
```
new_a = old_b = x₁ × original_a + y₁ × original_b
```
Therefore: `x₀, y₀ = x₁, y₁`

2. The new `b` becomes `a % b = a - q×b`, so:
```
new_b = (x₀ × original_a + y₀ × original_b) - q × (x₁ × original_a + y₁ × original_b)
      = (x₀ - q×x₁) × original_a + (y₀ - q×y₁) × original_b
```
Therefore: `x₁, y₁ = x₀ - q×x₁, y₀ - q×y₁`

## Complete Algorithm Flow

At each iteration:
1. Calculate quotient: `q = a // b`
2. Update values: `a, b = b, a % b`
3. Update coefficients: `x₀, y₀, x₁, y₁ = x₁, y₁, x₀ - q×x₁, y₀ - q×y₁`

> [!Example] Worked Example: gcd(30, 12)
> **Initialization**
> - Values: `a = 30, b = 12`
> - Initial coefficients: 
>   - For a: `x₀ = 1, y₀ = 0`
>   - For b: `x₁ = 0, y₁ = 1`
> 
> **Iteration 1**
> 1. `q = 30 // 12 = 2`
> 2. Values update: `a = 12, b = 6`
> 3. Coefficients update:
>    - For new a: `x₀, y₀ = 0, 1`
>    - For new b: `x₁, y₁ = 1 - 2×0, 0 - 2×1 = 1, -2`
> 
> **Iteration 2**
> 1. `q = 12 // 6 = 2`
> 2. Values update: `a = 6, b = 0`
> 3. Coefficients update:
>    - For new a: `x₀, y₀ = 1, -2`
>    - For new b: `x₁, y₁ = 0 - 2×1, 1 - 2×(-2) = -2, 5`
> 
> **Result**
> - GCD is 6
> - Final coefficients: `x₀ = 1, y₀ = -2`
> - Verification: `30 × 1 + 12 × (-2) = 6`

## Implementation

```python
def extended_gcd_iterative(a, b):
    x0, y0 = 1, 0  # Coefficients for a
    x1, y1 = 0, 1  # Coefficients for b
    
    while b != 0:
        q = a // b
        a, b = b, a % b
        x0, y0, x1, y1 = x1, y1, x0 - q*x1, y0 - q*y1
    
    return a, x0, y0
```

We can do [[2 Zettels/simultaneous assignment in c++\|simultaneous assignment in c++]], similar to Python, using `tie` and `make_tuple`

```cpp
#include <iostream>
#include <tuple>   // For std::tie

int extended_gcd(int a, int b, int &x, int &y) {
    x = 1, y = 0; // x0, y0
    int x1 = 0, y1 = 1;

    while (b != 0) {
        int q = a / b;
        std::tie(a, b) = std::make_tuple(b, a % b);
        std::tie(x, x1) = std::make_tuple(x1, x - q * x1);
        std::tie(y, y1) = std::make_tuple(y1, y - q * y1);
    }
    return a;
}
```

## Related
