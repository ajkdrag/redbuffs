---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-01T09:15:30.519+05:30"}
---


> [!Topics]
> - [[search algorithms\|search algorithms]]
> - [[divide and conquer\|divide and conquer]]

Ternary search is an efficient algorithm used to find the maximum or minimum of a [[2 Zettels/unimodal function\|unimodal function]], which is a function that has a single peak or trough. Unlike [[binary search\|binary search]], which splits the search space into two parts (and works for monotonic functions), ternary search divides it into 3 parts, making it particularly useful for optimization problems where the function is not strictly increasing or decreasing but has a single optimal point.

The algorithm repeatedly narrows the search interval. For each iteration, two midpoints are calculated. The function values at these midpoints are compared to determine which portion of the interval to keep (eliminates a third of the range), ensuring the optimal point remains within the retained segment.

> [!Tip]
> For continuous functions, ternary search iterates a fixed number of times (e.g., 100), similar to [[2 Zettels/binary search on real domain\|binary search on real domain]] to ensure the interval is sufficiently narrowed, providing a result within a desired precision.

### Algorithm
1. **Define the Interval**: Start with a search range `[low, high]` where the extremum is known to exist
2. **Divide the Interval**: Compute two midpoints:
   - `m1 = low + (high - low)/3`
   - `m2 = high - (high - low)/3`
3. **Compare Function Values**:
   - For finding a **maximum**: If `f(m1) < f(m2)`, the maximum must lie in `[m1, high]`; otherwise, it lies in `[low, m2]`.
   - For finding a **minimum**: If `f(m1) > f(m2)`, the minimum must lie in `[m1, high]`; otherwise, it lies in `[low, m2]`.
1. **Repeat**: Narrow the interval and iterate until the range is sufficiently small (e.g., when `high - low` is below a threshold)
2. **Check Remaining Values**: For discrete problems, directly *evaluate the remaining points* to find the exact extremum

**Time Complexity**: In each iteration our search space is two-thirds, leading to the recurrence: 
$$
T(n) = T(2n/3) + c
$$
Applying [[master's theorem\|master's theorem]], we get $O(\log_{3/2} N) \approx \Theta(\log n)$

### Example 1: Finding Minimum

```python
def ternary_search(low, high, f):
    while high - low > 3:
        m1 = low + (high - low) // 3
        m2 = high - (high - low) // 3
        if f(m1) < f(m2):
            high = m2
        else:
            low = m1
    return min(range(low, high+1), key=f)
```

### Example 2: Finding Maximum (continuous function)

```cpp
double ternary_search(double l, double r) {
    for (int i = 0; i < 100; ++i) {
        double mid1 = l + (r - l) / 3;
        double mid2 = r - (r - l) / 3;
        if (f(mid1) < f(mid2)) {
            l = mid1;
        } else {
            r = mid2;
        }
    }
    return (l + r) / 2;
}
```

## Related
