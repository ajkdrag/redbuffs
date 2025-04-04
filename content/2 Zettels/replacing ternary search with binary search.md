---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-01T11:26:16.491+05:30"}
---


> [!Topics]
> - [[search algorithms\|search algorithms]]

You'd normally use [[binary search\|binary search]] for finding an element from an increasing sequence of values, and [[2 Zettels/ternary search\|ternary search]] for finding the maximum when the values first increase and then start decreasing at some point (i.e. for a [[2 Zettels/unimodal function\|unimodal function]]).

A key observation here is that you can replace ternary search with a binary search for the point when the sign between adjacent values change. This results in an elegant implementation of ternary search (that's basically binary search in disguise) that works faster for integers:

```cpp
// finding peak
while(lo < hi) {
    int mid1 = (lo + hi) >> 1;
    int mid2 = mid1 + 1;
    if(f(mid1) < f(mid2)) {
        // in regular ternary search, we do lo = mid1
        // but since our termination criteria is lo < hi
        // this will cause infinite loop
        // 2 solutions:
        // - change criteria to: (lo < hi) > 3
        //   and brute force for remaining interval
        // - do: lo = mid1 + 1 = mid2 (similarly for hi)
        //   this is fine since f(mid1) < f(mid2) anyway
        //   and no other candidates to check between mid1 and mid2
        lo = mid2;
    }
    else {
        hi = mid1;
    }
}

int ans = (lo + hi)/2;
```

## Related
- [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]]
