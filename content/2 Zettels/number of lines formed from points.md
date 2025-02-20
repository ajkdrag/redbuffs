---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-02-11T18:01:54.068+05:30"}
---


> [!Topics]
> - [[2 Zettels/permutations and combinations\|permutations and combinations]]
> - [[geometry\|geometry]]

Given `n` points in a plane, out of which `k` are collinear, how many lines can be formed by joining pairs of these points?

This is a classic combination problem. Each line is uniquely determined by choosing 2 points out of `n` , i.e. `C(n, 2)`. From this, we subtract the overcounting due to the `k` collinear points: `C(k, 2)`. Finally we add 1 for the line that contains all the `k` points. Thus, `C(n,2)-C(k,2)+1`.

If we have many such collinear "groups", say G, within `n`. Then, tootal: `C(n,2)`, out of which we subtract overcounting from these groups: `C(G1, 2) + C(G2, 2) ... C(Gk, 2)` and add 1 for the single lines contributed from each group: `1 + 1 ... 1 = k`. Overall, ans:
$$
\binom{n}{2} - \sum^{G}_k \binom{k}{2} + k
$$

> [!Tip]
> Similar logic is applied for counting triangles as well. Only difference is that we don't add 1 since collinear points don't contribute a triangle (but they do contribute a line). Thus, we have: $\binom{n}{3} - \sum^{G}_k \binom{k}{3}$
## Related
