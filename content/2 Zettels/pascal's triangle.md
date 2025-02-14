---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[combinatorics\|combinatorics]]

- Each row `n` (0-indexed) contains `n+1` elements
- The first and last elements of each row are 1
- Each middle element is the sum of the two elements above it:  $C(n, k) = C(n-1, k-1) + C(n-1, k)$, this is basically the [[2 Zettels/binomial coefficient recursive relation\|binomial coefficient recursive relation]]

![](https://res.cloudinary.com/dcameztw9/image/upload/v1738927846/pascal%27s%20triangle-o2hbit.webp)

> Pascal's triangle can be used to visualize many properties of the binomial coefficient and the [[binomial theorem\|binomial theorem]]

```python
def generate_pascal_triangle(n):
    triangle = [[1] * (i + 1) for i in range(n)]
    for i in range(2, n):
        for j in range(1, i):
            triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j]

    for row in triangle:
        print(row)

```

**Key patterns and formula**
- entry `k` in row `n` is $C(n, k)$
- sum of elements in row `n` is $2^n$
- [[2 Zettels/hockey-stick identity\|hockey-stick identity]]: sum of elements along a diagonal forms a "hockey stick", i.e. $C(r, r) + C(r+1, r) + \ldots + C(n, r) = C(n+1, r+1)$
- sum of squares: $\sum^{n}_{k=0} C(n, k)^2 = C(2n, n)$
- prime rows : if `n` is prime, all entries in row `n` (except 1s) are divisible by `n`


## Related
