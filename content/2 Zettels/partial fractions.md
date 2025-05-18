---
{"publish":true,"created":"2025-03-21T10:32:53.695+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[2 Zettels/partial fractions - linear factors\|partial fractions - linear factors]]
> - [[2 Zettels/partial fractions - repeated linear factors\|partial fractions - repeated linear factors]]

Partial fractions are the *reverse* of adding/subtracting fractions. The goal is to decompose a rational function (a fraction where the numerator and denominator are polynomials) into a sum of simpler fractions.

This is useful in calculus, especially when finding [[anti-derivatives\|anti-derivatives]].

**General Form**:

A rational function  `P(x) / Q(x)`  where the degree of  `P(x)`  is *less than* the degree of  `Q(x)`  (i.e., a *proper* rational function) can be decomposed into partial fractions. If the degree of `P(x)` is greater than or equal to the degree of `Q(x)`, perform polynomial long division first.

$$
\frac{3x + 5}{2x^2 - 5x - 3}=\frac{2}{x-3} - \frac{1}{2x+1}
$$
And for improper:
$$
\frac{x^2+3x+2}{x+1}\quad (\text{Improper}\implies \text{divide first})
$$