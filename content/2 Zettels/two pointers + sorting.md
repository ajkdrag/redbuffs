---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - two pointers technique
> - sorting algorithms

> [!Question]- (2Sum) Find two indices in a sorted array where elements sum to target
> - left starts at `0`, right at `n-1`.
> - If `arr[left] + arr[right] > target`, decrement `right` (sum is too large).
> - If `sum < target`, increment `left`.
> - Time: $O(n)$ vs. brute-force $O(n^2)$.

> [!Question]- Deduplicat an array in-place
> - Sort the array $O(n \log n)$.
> - `slow` pointer tracks the last unique element.
> - `fast` scans ahead. When `arr[fast] != arr[slow]`, increment `slow` and copy `arr[fast]`.
> - Time: $O(n)$.

> [!Question]- (3Sum) Find all triplets `[a, b, c]` such that `a + b + c = 0`
> - Sort the array $O(n \log n)$.
> - Fix `a = arr[i]`, then use two pointers on the subarray `i+1` to `n-1` to find pairs `(b, c)` such that `b + c = -a`.
> - Time: $O(n^2)$ vs. brute-force $O(n^3)$.

## Related
