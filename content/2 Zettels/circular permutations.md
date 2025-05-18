---
{"publish":true,"created":"2025-02-14T18:18:41.594+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[2 Zettels/permutations and combinations\|permutations and combinations]]

Circular permutation is the total number of ways in which `n` distinct objects can be arranged around a fixed circle. In the circular permutation, there is nothing like a start or an end.

There are 2 cases of circular permutations
- If clockwise and anti-clockwise orders are **different**, then a total number of circular permutations is given by $P=(n−1)!$
- If clock-wise and anti-clock-wise orders are taken as **identical**, the total number of circular permutations is given by $P=(n−1)!/2$

> [!Note] Proof
> Suppose n things $(x_1,x_2,x_3,\ldots, x_n)$ are to be arranged around in a circular fashion. There are $n!$ ways in which they can be arranged in a row. On the other hand, all the linear arrangements depicted by
> $$
> \begin{align*}
> &x_1, x_2, \ldots x_n \\
> &x_n, x_1, \ldots x_{n-1} \\
> &x_{n-1}, x_n, \ldots x_{n-2} \\
> &x_2, x_3, \ldots x_1
> \end{align*}
> $$
> will lead to the same arrangement for a circular table. Hence each circular arrangement corresponds to $n$ linear arrangements (i.e. in a row). Hence the total number of circular arrangements of $n$ persons is $n!/n = (n − 1)!$
> 
> For the case where the clock-wise and anti-clockwise orders are identical, by symmetry, we have the number as: $(n-1)!/2$

## Related
