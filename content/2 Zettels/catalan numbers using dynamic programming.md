---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[dynamic programming\|dynamic programming]]
> - [[2 Zettels/catalan number\|catalan number]]
> - [[2 Zettels/contribution technique\|contribution technique]]

Basic dp based on the [[2 Zettels/catalan series recurrence relation proof\|catalan series recurrence relation proof]]:

```python
def catalan_dp(n):
    catalan = [0] * (n + 1)
    catalan[0] = catalan[1] = 1
    for i in range(2, n + 1):
        for j in range(i):
            catalan[i] += catalan[j] * catalan[i - 1 - j]
    return catalan[n]
```

Another interesting implementation based on the contribution technique where rather than fixing `k` and looking back at all possible `(i, k−1−i)` pairs, we *fix a pair* `(i, j)` and **push** that product into the correct position `k = i + j + 1`:

```python
def catalan_dp_contribution(n):
    catalan = [0] * (n + 1)
    catalan[0] = 1  # Base case: C_0 = 1

    for i in range(0, n):
        for j in range(i+1):
            if i + j + 1 > n:
                break
            mul = 1 if i == j else 2
            catalan[i + j + 1] += mul * catalan[i] * catalan[j]

    return catalan


print(catalan_dp_contribution_v(8))
# [1, 1, 2, 5, 14, 42, 132, 429, 1430]
```

The outer loop processes `i` in increasing order. By the time `C(i)` is used, all `C(j)` for `j <= i` have **already been computed**. This guarantees that contributions to `C(i + j + 1)` are based on finalized values. For each `i` and `j`:
- **Case 1 (`i == j`):** The term `C(i) * C(j)` is added once to `C(2i + 1)`.
- **Case 2 (`i != j`):** The term `2 * C(i) * C(j)` accounts for both `C(i) * C(j)` and `C(j) * C(i)` (handled by iterating `j <= i` and using the multiplier).

### Example Walkthrough (n = 3)

1. **Base Case:** `C[0] = 1`.
2. **i = 0:**
    - `j = 0`: Contributes `1 * C[0] * C[0] = 1` to `C[1]`. Now, `C[1] = 1`.
3. **i = 1:**
    - `j = 0`: Contributes `2 * C[1] * C[0] = 2` to `C[2]`.
    - `j = 1`: Contributes `1 * C[1] * C[1] = 1` to `C[3]`.
4. **i = 2:**
    - `j = 0`: Contributes `2 * C[2] * C[0] = 4` to `C[3]`.
    - `j = 1`: `2 + 1 + 1 = 4 > 3`, loop breaks.
5. **Result:** `C[3] = 1 + 4 = 5` (matches the 3rd Catalan number).

For both the implementations, we have: 
- **Time complexity**: $O(n^2)$
- **Space complexity**: $O(n)$

## Related
    