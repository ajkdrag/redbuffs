---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[2 Zettels/linear diophantine equations\|linear diophantine equations]]

A linear Diophantine equation is of the form:  `ax + by = c`, where `a, b, c` are integers, and we seek integer solutions `x, y`.  

A solution exists **if and only if** `gcd(a, b)` divides `c`:
- If `gcd(a, b) ∤ c`, there are **no solutions**
- If `gcd(a, b) | c`, there are **infinitely many solutions**

> [!Note]
> We use the [[2 Zettels/extended euclidean algorithm\|extended euclidean algorithm]] to find **one particular solution** `(x0, y0)` for `ax + by = gcd(a, b)` and scale it by `c/g`

```cpp
bool solve_diophantine(int a, int b, int c, int &x, int &y) {
    int g = extended_gcd(abs(a), abs(b), x, y);
    if (c % g != 0) return false;

    x *= c / g;
    y *= c / g;

    // Adjust signs if a or b was negative
    if (a < 0) x = -x;
    if (b < 0) y = -y;

    return true; // Solution exists
}
```

### General solution

If $(x_0, y_0)$ is a particular solution, the **general solution** is:  

$$
\begin{align*}
x &= x_0 + k \frac{b}{g}\\
y &= y_0 - k \frac{a}{g}\\
\end{align*}
$$
where $k$ is an integer, and `g = gcd(a, b)`. This shows that there are **infinitely many solutions** if `gcd(a, b) | c`.

> A unique solution exists **only if** `a` and `b` are coprime (`gcd(a, b) = 1`) **and** additional constraints are applied (e.g., bounding `x` and `y` to a specific range). Otherwise, there are infinitely many solutions.

## Related
