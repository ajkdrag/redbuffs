---
{"publish":true,"created":"2025-03-21T11:32:56.307+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[2 Zettels/partial fractions\|partial fractions]]

If the denominator `Q(x)` has repeated linear factors, such as $(x - a)^n$, the partial fraction decomposition includes terms for each power of the repeated factor up to $n$.

**General Form:**

For a factor $(x - a)^n$, include the terms:

$$
\frac{A_1}{(x - a)} + \frac{A_2}{(x - a)^2} + \ldots + \frac{A_n}{(x - a)^n}
$$

where $A_1, A_2, \ldots, A_n$ are constants to be determined.

**Method to find the constants**

1.  Multiply both sides by `Q(x)`
2.  Substitute the value of `x` that makes the linear factor zero (e.g., `x = a`). This will find the value of `A`
3. To find the other coefficients is to differentiate both sides of the equation, and reapeat step 2.
4.  Alternatively, equate coefficients of like terms. This often becomes more complex with repeated factors

**Example:**
$$
\frac{(x+2)}{x(x-1)^2} = \frac{A}{x} + \frac{B}{(x-1)} + \frac{C}{(x-1)^2}
$$
Multiply both sides by $x(x-1)^2$:
$$
x + 2 = A(x-1)^2 + B(x)(x-1) + C(x)
$$

Substituting $x = 0$, you get $2 = A(-1)^2  => A = 2$.
Substituting $x = 1$, you get $3 = C(1) => C = 3$.

To get $B$, you can expand and solve for the coefficients:
$$
x + 2 = A(x^2 - 2x + 1) + B(x^2 - x) + Cx
$$
$$
x + 2 = (A+B)x^2 + (-2A -B +C)x + A
$$
With $A=2$ and $C=3$, we have: 
$$
x + 2 = (2+B)x^2 + (-4 -B + 3)x + 2
$$
$$
x + 2 = (2+B)x^2 + (-1 -B)x + 2
$$
Equating the coefficients we get $B = -2$.

Final result:
$$
\frac{(x+2)}{x(x-1)^2} = \frac{2}{x} - \frac{2}{(x-1)} + \frac{3}{(x-1)^2}
$$
