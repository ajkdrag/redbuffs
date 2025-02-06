---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[modular arithmetic\|modular arithmetic]]
> - [[prime numbers\|prime numbers]]
> - [[exponentiation\|exponentiation]]

$$
\begin{align*}
a^p &\equiv a\operatorname{mod}{p} \\
a^{p-1} &\equiv 1\operatorname{mod}{p}
\end{align*}
$$

where $p$ is a **prime** and $a$ isn't divisible by $p$. Above is a special case of [[euler's theorem for modular arithmetic\|euler's theorem for modular arithmetic]]

If $a$ is divisible by $p$, then $a^p\equiv a \operatorname{mod}p$ is still true while $a^{p-1} \equiv 1\operatorname{mod}{p}$ is false. It follows that the first is always true for any $a\in{Z}$ and $p$ being prime, but the second only in the case where $\gcd(a,p)=1$.

> This is because, to obtain second, we need to multiply the [[2 Zettels/modular multiplicative inverse\|modular multiplicative inverse]] $a^{-1}$ to both sides of the congruence, and this inverse [[2 Zettels/modular multiplicative inverse existence condition\|exists iff a and p are co-prime]].



## Related
