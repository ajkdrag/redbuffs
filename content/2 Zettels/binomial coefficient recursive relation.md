---
{"publish":true,"created":"2025-02-07T11:30:14.946+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[combinatorics\|combinatorics]]

Consider choosing $k$ elements from $n$ elements: 
- If an element (say first one) **is chosen**, we need to pick $k-1$ elements from remaining $n-1$, which is $\binom{n-1}{k-1}$
- If the first one is **not chosen**, we need to pick $k$ elements from remaining $n-1$, which turns out to be $\binom{n-1}{k}$

Since both cases cover all possibilities, we have:
$$
\binom{n}{k}=\binom{n-1}{k-1}+\binom{n-1}{k}
$$
This formula is also how [[2 Zettels/pascal's triangle\|pascal's triangle]] is constructed.

## Related
