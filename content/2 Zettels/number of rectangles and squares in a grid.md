---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-02-13T15:30:43.688+05:30"}
---


> [!Topics]
> - [[combinatorics\|combinatorics]]
 
In an `m x n` grid, to form a rectangle, you need to choose two horizontal lines and two vertical lines from the `m+1` horizontal lines and `n+1` vertical lines. Thus we have:
$$
\text{num-rects}=\binom{m+1}{n+1}
$$

A square, on the other hand requires the length and width to be equal. To count the number of squares, you need to consider different sizes: Largest possible square has size: `min(m, n)`. For each size `k x k` (where `k` ranges from `1` to `min(m, n)`), you sum up the number of squares for all possible sizes to get the total number of squares. This can be explained with an example:

> [!Example]
> Let's say m = 5, n = 7, and we want to find the number of 2 x 2 squares (so k = 2).
> 
> - Horizontal positions: (7 - 2 + 1) = 6
> - Vertical positions: (5 - 2 + 1) = 4
> - Total 2 x 2 squares: 6 * 4 = 24
> 
> You can visualize this. There are 6 places you can slide a 2x2 square horizontally, and 4 places you can slide it vertically. Each combination gives you a unique 2x2 square within the 5x7 grid.
> 
> ![](https://res.cloudinary.com/dcameztw9/image/upload/v1739441781/number%20of%20rectangles%20and%20squares%20in%20a%20grid-thtgl8.webp)
> In the figure above, we can see the cells with S denoting the starting position and S' denoting the max position where we can place the square horizontally and vertically.

Therefore, we can observe that the total number of `k x k` squares: `(m-k+1) * (n-k+1)`. Summing for all `k` values, we get:

$$
\begin{align*}
\sum_{k=1}^{\min({m, n})} [(m-k+1)\cdot(n-k+1)]
\end{align*}
$$

## Related
