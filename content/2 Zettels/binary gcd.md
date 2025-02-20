---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-02-03T19:40:47.705+05:30"}
---


> [!Topics]
> - [[2 Zettels/euclid's algorithm\|euclid's algorithm]]
> - [[bit manipulation\|bit manipulation]]

Binary GCD (Stein's Algorithm) computes the greatest common divisor (GCD) using bit-level operations (shifts, subtractions) instead of divisions. This makes it especially efficient for competitive programming where minimizing expensive operations is crucial.

- **Base Cases:**
    - If either number is zero, the GCD is the other number
- **Extracting Factors of 2:**
    - If both numbers are even, factor out the common power of 2 $\gcd(2a, 2b) = 2 \times \gcd(a, b)$
- **Handling Parity:**
    - If one number is even and the other odd, remove factors of 2 from the even number: $\gcd(a, b) = \gcd\left(\frac{a}{2}, b\right)$
- **Subtraction for Odd Numbers:**
    - For two odd numbers, subtract the smaller from the larger, and then divide the difference by 2: $\gcd(a, b) = \gcd\left(\frac{|a-b|}{2}, \min(a,b)\right)$
    - This step reduces the values while preserving the GCD.
- **Termination:**
    - Continue until one of the numbers becomes zero. Multiply the remaining number by the accumulated factor of 2 to get the final GCD.

## C++ Implementation

```cpp
int binary_gcd(int a, int b) {
    if (a == 0) return b;
    if (b == 0) return a;
    
    int shift = 0;
    // Remove common factors of 2
    while (((a | b) & 1) == 0) {
        a >>= 1;
        b >>= 1;
        shift++;
    }
    
    // Ensure a is odd
    while ((a & 1) == 0)
        a >>= 1;
    
    while (b != 0) {
        // Remove factors of 2 in b
        while ((b & 1) == 0)
            b >>= 1;
        
        // Ensure a <= b
        if (a > b)
            swap(a, b);
        
        b = b - a;
    }
    
    // Restore common factors of 2
    return a << shift;
}
```

## Related
