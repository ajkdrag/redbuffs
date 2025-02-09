---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[search algorithms\|search algorithms]]

The staircase search algorithm (aka zigzag search) is an efficient technique for finding a target value in a 2D matrix that is sorted both row-wise (ascending from left to right) and column-wise (ascending from top to bottom).

**Core Idea:**  Observe that if pick any element `a[row][col]`, then all elements up and left i.e. `a[:row][:col]` are smaller than it, and all elements down and right i.e `a[row:, col:]` are greater than it. Thus, if we start at either the *top-right or bottom-left corner* of the matrix, then by comparing the current element with the target, we can do divide and conquer in each step, leading to an $O(m + n)$ time complexity.

**Algorithm (Top-Right Start):**
1.  Start at the top-right element (`row = 0`, `col = n - 1`).
2.  **Compare:**
    *   If `matrix[row][col] == target`: Target found! Return `True`.
    *   If `matrix[row][col] > target`: Move one column to the left (`col -= 1`).
    *   If `matrix[row][col] < target`: Move one row down (`row += 1`).
3.  **Out of Bounds:** If `row` or `col` go out of bounds, the target is not in the matrix. Return `False`.

> [!Note]
> If we start from bottom-left, we traverse `up` and `right` through the matrix.

**Why Top-Right/Bottom-Left?**
Only these starting positions guarantee that a single comparison with the target gives a *unique* direction to move (left or down from top-right, up or right from bottom-left).  Starting at other corners leads to ambiguity.

**Time Complexity:** $O(m + n)$ - Linear with respect to the dimensions of the matrix.
**Space Complexity:** $O(1)$ - Constant extra space.

## Related
- [[6 Problems/search a 2D sorted matrix\|search a 2D sorted matrix]]