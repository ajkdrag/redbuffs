---
{"publish":true,"created":"2025-01-28T13:25:04.868+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/staircase search\|staircase search]]
> - [[matrices\|matrices]]

## Idea

Straightforward application of the staircase algorithm, leveraging the sorted nature of the matrix.
**Algorithm**

1. **Start at Top-Right:** Begin at the top-right element of the matrix (`row = 0`, `col = n - 1`).
2. **Comparison and Movement:**
    - If `matrix[row][col] == target`: You've found the target; return `True`.
    - If `matrix[row][col] > target`: Move one column to the left (`col -= 1`). Because the row is sorted, all elements to the right are greater than the target.
    - If `matrix[row][col] < target`: Move one row down (`row += 1`). Because the column is sorted, all elements above are smaller than the target.
3. **Out of Bounds:** If at any point `row` goes out of bounds (becomes `>= m`) or `col` goes out of bounds (becomes `< 0`), the target is not in the matrix; return `False`.

## Code

```python
def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
    n, m = len(matrix), len(matrix[0])
    i, j = 0, m-1
    while (0 <= i < n) and (0 <= j < m):
        curr = matrix[i][j]
        if (curr == target): return True
        elif (curr < target): i += 1
        else: j -= 1

    return False
```

## Related

- [[6 Problems/search a 1D array reshaped as 2D matrix\|search a 1D array reshaped as 2D matrix]]
