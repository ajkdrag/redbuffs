---
{"publish":true,"tags":["type/problem"],"platform":"Codeforces","link":"https://codeforces.com/problemset/problem/36/B","PassFrontmatter":true,"created":"2025-03-07T23:47:21.802+05:30"}
---


> [!Topics]
>
> - [[recursion\|recursion]]
> - [[2 Zettels/printing patterns\|printing patterns]]
> - [[fractals\|fractals]]

In this problem, we need to generate a fractal pattern based on an n×n model. The fractal is generated through k steps where:

1. We start with the original model
2. For each white square, we replace it with a scaled copy of the original model
3. Black squares remain black

## Idea

The key insight is to recognize the recursive nature of the problem. After $k$ steps, our fractal will be an $n^k \times n^k$ grid. Each step increases the grid size by a factor of $n$.

The most elegant approach is to use recursion:

1. Base case: If $k=1$, return the original model
2. Recursive step:
   - Generate the fractal for $k-1$ steps
   - For each cell in this $(k-1)$-step fractal:
     - If it's black, fill the corresponding $n\times{n}$ block with black
     - If it's white, copy the original model pattern into the $n\times{n}$ block

A critical part of the implementation is understanding how to map pixels from the $(k-1)$-step fractal to the $k$-step fractal. When we move from the $(k-1)$-step fractal to the $k$-step fractal, we're essentially "zooming in" and adding more detail. Each single cell in the $(k-1)$-step fractal expands into an $n\times{n}$ block in the $k$-step fractal.

Let's say we have a cell at position $(i, j$) in the $(k-1)$-step fractal:

1. In the $k$-step fractal, this single cell becomes an $n \times n$ block
2. The top-left corner of this block starts at position $(i \times n, j \times n)$
3. Each position within this block can be addressed as $(i\times n+di, j\times n+dj)$, where:
   - $di$ ranges from 0 to $n-1$ (representing rows within the block)
   - $dj$ ranges from 0 to $n-1$ (representing columns within the block)

**Time Complexity:** $O(n^{2k})$ - we need to generate and process an $n^k \times n^k$ grid
**Space Complexity:** $O(n^{2k})$ - we need to store the final $n^k \times n^k$ grid

## Code

```python
def generate_fractal(model, k):
    n = len(model)

    # Base case: if k = 1, return the model itself
    if k == 1:
        return [row[:] for row in model]

    # Recursive step: generate fractal of k-1 steps
    prev_fractal = generate_fractal(model, k - 1)

    size = n ** (k - 1)
    result = [["."] * (size * n) for _ in range(size * n)]  # n^k x n^k grid

    # For each cell in the previous fractal
    for i in range(size):
        for j in range(size):
            # coordinate transformation
            if prev_fractal[i][j] == "*":
                # If the cell is black, fill the corresponding n×n block entirely with black
                for di in range(n):
                    for dj in range(n):
                        result[i * n + di][j * n + dj] = "*"
            else:
                # If the cell is white, copy the model pattern into the corresponding n×n block
                for di in range(n):
                    for dj in range(n):
                        result[i * n + di][j * n + dj] = model[di][dj]

    return result


def solve(n, k, model_str):
    model = [list(line) for line in model_str]
    fractal = generate_fractal(model, k)
    return ["".join(row) for row in fractal]

```

## Related
