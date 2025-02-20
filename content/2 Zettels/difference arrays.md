---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[arrays\|arrays]]
> - [[2 Zettels/prefix sums\|prefix sums]]

Useful for efficiently applying multiple [[range updates\|range updates]] (e.g., add `x` to `[l, r]`) followed by queries. Construction is easy:
- Initialize `diff[0] = A[0]`, `diff[i] = A[i] - A[i-1]` for `i > 0`
- To update `[l, r]` by `x`: `diff[l] += x`, `diff[r+1] -= x`
- Reconstruct array via prefix sums of `diff`

Say, we update `[1, 2]` by `x`. Our difference array: `[A[0], (A[1] - A[0] + x), (A[2] - A[1]), (A[3] - A[2] - x),  ...]`. When we do prefix sum, due to the [[telescope effect\|telescope effect]], we get: `[A[0], A[1]+x, A[2]+x, A[3], ...]` which is as desired.

**Time Complexity:** Range update: O(1), Reconstruction: O(n), query : O(1).

> [!Note]
> In many problems, where we start out with an array of all 0's and are asked to do [[range updates\|range updates]], all we do is point updates on array of 0's: `diff[l]+=x` and `diff[r+1]-=x`. We still call the concept "difference arrays", even though we don't subtract and initialize explicitly.

> [!Tip]
> Common strategy is to **not** create the difference array, instead create an aux array of 0's and do point updates on it and finally add the aux array with the original array point wise. Example: `arr=[1, 2, 3, 4]`, and we want to update `[1, 2]` with `x`. Our aux array is `[0, 0, 0, 0]` and we do point updates on it -> `[0, x, 0, -x]`. Performing prefix sum on the aux array gives us -> `[0, x, x, 0]` and we can finally do `arr+aux` and get -> `[1, 2+x, 3+x, 4]` which is desired. This makes dealing with [[2 Zettels/difference arrays#2D Range Updates\|#2D Range Updates]] straightforward.

### 2D Range Updates

Difference Array for 1D Range Updates can be extended to 2D arrays for efficient range updates. For a 2D array, a range update is defined by the top-left corner `(r1, c1)` and bottom-right corner `(r2, c2)`.  As mentioned previous, we create an aux array of 0's (instead of dealing with original array directly) and update the ranges with a value `val`.

```python
aux_arr[r1][c1] += val
if (c2 + 1 < cols): aux_arr[r1][c2 + 1] -= val
if (r2 + 1 < rows): aux_arr[r2 + 1][c1] -= val 
if (r2 + 1 < rows && c2 + 1 < cols): aux_arr[r2 + 1][c2 + 1] += val
```
Here, `rows` and `cols` are the dimensions of the 2D array. We can perform the point updates any number of times in constant time.

Once we are done updating, we calculate the [[2 Zettels/2D prefix sums\|2D prefix sums]] of the `aux_arr`:

```python
for i in range(rows): 
    for j in range(cols): 
        if (i > 0): aux_arr[i][j] += aux_arr[i-1][j]
        if (j > 0) aux_arr[i][j] += aux_arr[i][j-1]
        if (i > 0 && j > 0) aux_arr[i][j] -= aux_arr[i-1][j-1]
```

After this operation, `aux_arr` will hold the "cumulative updates" and we can do `arr[i][j] += aux_arr[i][j]` to "apply" the effect of doing all the range updates.

**Minimal Example:**
Consider a 3x3 array. We want to update the region (0, 0) to (1, 1) with a value of 5.

Initial `aux_arr` (3x3):
```
[[0, 0, 0], 
[0, 0, 0], 
[0, 0, 0]]
```

Update range (0, 0) to (1, 1) with value 5:
```
aux_arr[0][0] += 5; // aux_arr[0][0] becomes 5 
aux_arr[0][1+1] -= 5; // aux_arr[0][2] becomes -5 
aux_arr[1+1][0] -= 5; // aux_arr[2][0] becomes -5 
aux_arr[1+1][1+1] += 5; // aux_arr[2][2] becomes 5
```

Updated `aux_arr`:
```
[[ 5, 0, -5], 
[ 0, 0, 0], 
[-5, 0, 5]]

```

Calculate 2D prefix sum to get the final array:

After prefix sum calculation `aux_arr` becomes:
```
[[ 5, 5, 0], 
[ 5, 5, 0], 
[ 0, 0, 0]]
```

This correctly reflects that the region from (0, 0) to (1, 1) is updated to 5, and the rest remains 0.

## Related
