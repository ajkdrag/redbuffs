---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-03-21T11:30:27.169+05:30"}
---


> [!Topics]
> - [[2 Zettels/partial fractions\|partial fractions]]

If the denominator $Q(x)$ can be factored into distinct linear factors $(x - a)$, $(x - b)$, etc., then the partial fraction decomposition takes the form:

$$
\frac{P(x)}{Q(x)} = \frac{A}{(x - a)} + \frac{B}{(x - b)} + ...
$$

where $A$, $B$, ... are constants to be determined.

**Method to find A, B, ... :**

1.  Multiply both sides by $Q(x)$
2.  Substitute values of $x$ that make each linear factor zero (e.g., $x = a$, $x = b$).  This eliminates all but one unknown constant, allowing you to solve for it directly
3.  Alternatively, equate coefficients of like terms on both sides to create a system of linear equations. Solve this system to find the constants

**Example:**
Decompose: $\frac{5x - 4}{(x^2 - x - 2)}$

Factoring the denominator, the expression is equal to $\frac{5x - 4}{(x-2)(x+1)}$.
Using the method above we get:
$$
\frac{5x - 4}{(x-2)(x+1)} = \frac{A}{(x-2)} + \frac{B}{(x+1)}
$$
Multiply both sides by the denominator:
$$
5x - 4 = A(x+1) + B(x-2)
$$

Substitute $x=2$ into the equation to get $6 = 3A$, thus $A=2$.
Substitute $x=-1$ into the equation to get $-9 = -3B$, thus $B=3$.

Final result:
$$
\frac{5x - 4}{(x^2 - x - 2)} = \frac{2}{(x - 2)} + \frac{3}{(x + 1)}
$$
