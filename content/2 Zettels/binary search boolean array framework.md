---
{"publish":true,"created":"2025-02-11T00:30:40.319+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[algorithmic paradigm\|algorithmic paradigm]]

Most binary search problems can be reframed as finding the first `true` in a conceptual boolean array `[F, F, ..., F, T, T, ..., T]`. Define a function `check(mid)` that returns `true` if `mid` is “good enough” (meets the condition) and `false` otherwise.

1. **Set up the search space.**
    - Typically, `lo = 0` and `hi = n - 1` for an array of size `n`
    - Many problems require search on _answer space_: (e.g., `lo = 0`, `hi = 10^9`)
2. **Binary Search Loop.**
    - While `lo <= hi`, compute `mid = lo + (hi - lo) / 2` (tackles overflow)
    - If `check(mid) == true`, _record_ `mid` as a candidate (e.g., `ans = mid`) and move `hi` left to search for an earlier `true`.
    - Otherwise, move `lo` right to find a possible `true`.
3. **Interpret `ans`.**
    - If `ans` was updated, it’s the first index where `check` was `true`.
    - If it was never updated, no valid solution exists under your `check` condition.

> [!Note] Why This Works:
>
> Once `check(mid)` flips to `true`, everything at or beyond `mid` remains `true`. Once it’s `false`, everything before it remains `false`. You’re leveraging this monotonic property to discard half the search space each step.

```cpp
int lo = 0;
int hi = n - 1;
int ans = n;  // or some 'not found' default, often n means 'beyond last index'

while (lo <= hi) {
    int mid = lo + (hi - lo) / 2; // safer than (lo + hi) to avoid overflow

    if (check(mid)) {
        // 'mid' is a valid index (we found a '1'), try finding an earlier valid index.
        ans = mid;     // record this index
        hi = mid - 1;  // search in [lo .. mid-1]
    } else {
        // 'mid' is not valid (we found a '0'), so search in [mid+1 .. hi]
        lo = mid + 1;
    }
}
cout << ans << "\n";  // 'ans' is the first index for which check(mid) was true
```

### Variations

Sometimes, you want the last `false` instead of the first `true`. Similar approach, but you might have:

```cpp
if (check(mid)) {
    // 1 found, skip left portion because we want the last false
    hi = mid - 1;
} else {
    ans = mid; // store the last false
    lo = mid + 1;
}
```

In some problems (like searching for a floating-point answer), you do repeated halving with a loop that ends when `(hi - lo) < some_epsilon`. You still rely on a monotonic feasibility check, but the loop termination condition changes.

> [!Example]
> If we are asked to find index of [[6 Problems/min element in a rotated sorted array\|min element in a rotated sorted array]], our check function would look like: `bool check(int mid) { return (v[mid] <= v[n-1]); }`

## Related
