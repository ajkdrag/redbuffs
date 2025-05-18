---
{"publish":true,"created":"2025-03-15T12:57:40.920+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[binary search\|binary search]]


Binary search is a powerful technique for finding a target value within a sorted search space. When dealing with floating-point numbers, some adjustments are needed compared to integer binary search to handle the continuous nature of the space and avoid infinite loops. 

**Core Idea:** repeatedly divide the search interval in half and narrow down the search range based on whether the middle value is "too high" or "too low."

**Implementation Details:** Unlike integer binary search where we can check for `lo <= hi` and terminate when `lo == hi + 1`, floating-point comparisons require a different approach since, we can never perfectly **converge** on a **continuous** value. Here are two methods to achieve the required precision.

1.  **Fixed Number of Iterations:** Run the binary search for a predetermined number of iterations (e.g., 80). This guarantees termination and often provides sufficient precision for most problems (preferred approach)
2.  **Epsilon-Based Comparison:** Continue the binary search until the difference between the upper and lower bounds (`hi - lo`) is smaller than a predefined epsilon value (`eps`).  `eps` represents the desired level of accuracy. A common value for `eps` is `1e-7` or `1e-9`, depending on the problem's constraints

**Code Template (Epsilon-Based):**

```cpp
double lo = lower_bound;
double hi = upper_bound;
double ans = hi; // Initialize with a default value

while (hi - lo > eps) {
  double mid = lo + (hi - lo) / 2.0; // Avoid potential overflow
  if (check(mid)) {
    ans = mid;
    hi = mid; // or hi = mid - eps if you need to exclude mid
  } else {
    lo = mid; // or lo = mid + eps if you need to exclude mid
  }
}

// ans now holds the approximate solution
```

**Code Template (Fixed Iterations):**

```cpp
double lo = lower_bound;
double hi = upper_bound;
double ans = hi; // Initialize with a default value

for (int i = 0; i < 100; ++i) {
  double mid = lo + (hi - lo) / 2.0;
  if (check(mid)) {
    ans = mid;
    hi = mid - eps;
  } else {
    lo = mid + eps;
  }
}

// ans now holds the approximate solution
```

## Related
- [[6 Problems/the meeting place cannot be changed\|the meeting place cannot be changed]]