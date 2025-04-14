---
{"publish":true,"tags":["type/problem"],"platform":"Leetcode","link":"https://leetcode.com/problems/separate-squares-i/description/","PassFrontmatter":true,"created":"2025-03-17T14:38:53.628+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]

You are given a 2D integer array `squares`. Each `squares[i] = [xi, yi, li]` represents the coordinates of the bottom-left point and the side length of a square parallel to the x-axis.

Find the **minimum** y-coordinate value of a horizontal line such that the total area of the squares above the line *equals* the total area of the squares below the line. Answers within $10^-5$ of the actual answer will be accepted.

**Note**: Squares **may** overlap. Overlapping areas should be counted **multiple times**.

## Idea

We can use [[binary search\|binary search]] on the y-coordinate. The core idea is to define a `check(y)` function that determines if, for a given y-coordinate, the area below the line is greater than or equal to the area above the line. This leverages the [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]]. Since we are dealing with floating point numbers, we use [[2 Zettels/binary search on real domain\|binary search on real domain]].

**Why Binary Search Works:**

There's a _monotonic_ relationship between the line's y-coordinate and the areas above/below it. As `y` increases, the area below increases, and the area above decreases (and vice-versa). This allows us to use binary search. The `check(y)` function effectively tests the boolean condition `below >= above`. We use `>=` instead of `==` because, due to the discrete nature of squares, there might not be a single `y` where areas are _exactly_ equal. We seek the _minimum_ `y` where `below >= above`, the "tipping point".

### Approach 1 (Direct Binary Search)

This approach directly calculates the areas above and below the line for each candidate `y` in the binary search.

1.  **Iterate through each square:**
2.  **Three Cases:**
    - **Square completely below:** `y_hi <= y`. Add the entire square's area to `below`
    - **Square completely above:** `y_lo >= y`. Add the entire square's area to `above`
    - **Square intersects the line:** Calculate the area below (`(y - y_lo) * side`) and the area above (`(y_hi - y) * side`) and add them to the respective totals
3.  **Return `below >= above`:** This indicates whether the current `y` satisfies the condition

**Time Complexity:** $O(n \times \text{iterations}) \approx O(n \log n)$, where n is the number of squares.
**Space Complexity:** $O(1)$

### Approach 2 (Prefix Sums + Binary Search)

This approach optimizes the area calculation using [[2 Zettels/prefix sums\|prefix sums]] to avoid looping all the squares within the `check` function.

**Preprocessing:**

1.  **Sort by Bottom Y:** Sort `squares` by their bottom y-coordinate (`squares[i][1]`)
2.  **`bottomYs`:** Store the sorted bottom y-coordinates
3.  **Sort by Top Y:** Create `topPairs` (pairs of {top y, side}) and sort it. Extract `topYs` from the sorted `topPairs`
4.  **Prefix Sums (Bottom Y Sorted):**
    - `prefixArea`: Cumulative sum of areas (`side * side`)
    - `prefixWeightedTop`: Cumulative sum of `top * side`. This helps calculate the area above the line for intersecting squares
    - `prefixSide`: Cumulative sum of side lengths
5.  **Prefix Sums (Top Y Sorted):**
    - `prefixWeightedTopV2`: Cumulative sum of `top * side` (on top y sorted squares)
    - `prefixSideTop`: Cumulative sum of side lengths (on top y sorted squares)

**The `check` function:**

1.  **Binary Search on `bottomYs`:** Find the index `idx` of the first square whose bottom y is greater than or equal to the current `y`.
2.  **Area Below:** `prefixArea[idx]` gives the total area of squares that "start" below `y`
3.  **Area Above:** `prefixArea.back() - prefixArea[idx]` gives the total area of squares _completely_ above `y`
4.  **Intersecting Squares (Above):**
    - `partialAbove = prefixWeightedTop[idx] - y * prefixSide[idx]`. This efficiently calculates the total area above `y` for squares that intersect the line. But this incorrectly, also takes into account the squares that are entirely below the line. Hence, we need to subtract/adjust this "extra"
5.  **Adjustment for Squares Completely Below (Top Y):**
    - Binary search on `topYs` to find `idxTop` (last square that lies completely below line)
    - `partialAboveAdjustment = prefixWeightedTopV2[idxTop] - y * prefixSideTop[idxTop]`. Subtracts the contribution of squares that are entirely below the line (based on top Y)
6.  **Cut Adjustment:** `cutAdjustment = partialAbove - partialAboveAdjustment`
7.  **Final Correct Areas:** `areaBelow -= cutAdjustment`, `areaAbove += cutAdjustment`
8.  **Return `below >= above`**

**Time Complexity:** $O(n \log n + \text{iterations} \times \log n)$. The $n \log n$ comes from sorting, and the binary searches within `check` contribute the second term.
**Space Complexity:** $O(n)$ due to the prefix sum arrays.

## Code

```cpp
# Approach 1 (Binary Search)
bool check(double y, vector<vi> &squares) {
  double below = 0, above = 0;

  for (vi &square : squares) {
    int y_lo = square[1];
    int y_hi = square[1] + square[2];

    if (y_hi <= y) {
      // below line
      below += 1.0 * square[2] * square[2];
    } else if (y_lo >= y) {
      // above line
      above += 1.0 * square[2] * square[2];
    } else {
      // line cuts through
      below += (y - y_lo) * square[2];
      above += (y_hi - y) * square[2];
    }
  }

  return below >= above;
}

double solve(vector<vi> &squares) {
  int max_iters = 50;
  double lo = 0;
  double hi = 1e9+5;
  double ans = hi;
  double eps = 1e-5;

  for (int i = 0; i < max_iters; ++i) {
    double mid = lo + (hi - lo) / 2.0;
    if (check(mid, squares)) {
      ans = mid;
      hi = mid - eps;
    } else {
      lo = mid + eps;
    }
  }

  return ans;
}

# Approach 2 (prefix sums and range queries)
bool check(long double y, const vector<long double> &bottomYs, const vll &prefixArea,
           const vll &prefixWeightedTop, const vll &prefixSide,
           const vector<long double> &topYs, const vll &prefixWeightedTopV2,
           const vll &prefixSideTop) {
  // Find the first square (in squares sorted by bottom y) whose bottom is >= y.
  int idx = lower_bound(all(bottomYs), y) - bottomYs.begin();

  // Squares with bottom < y contribute their full area to "below" the line.
  long double areaBelow = prefixArea[idx];
  long double areaAbove = prefixArea.back() - prefixArea[idx];

  // For squares that start below y, compute the "extra" area from the portion
  // of the square that lies above y. Our prefixWeightedTop stores (bottom +
  // side)*side for each square. The contribution of a square with bottom b, top t and
  // side l that is cut by y is:
  //   (t - y) * l = (b + l) * l - y * l.
  long double partialAbove = prefixWeightedTop[idx] - y * prefixSide[idx];

  // However, for squares that are completely below y (when considering their
  // top), we must subtract their contributions since they were incorrectly accounted for in the previous calculation. We do a binary search on the sorted topYs array to find squares that are completely below y
  int idxTop = lower_bound(all(topYs), y) - topYs.begin();
  long double partialAboveAdjustment = prefixWeightedTopV2[idxTop] - y * prefixSideTop[idxTop];

  // The net extra area from squares that are cut by the line.
  long double cutAdjustment = partialAbove - partialAboveAdjustment;

  // Remove the "cut" area from below and add it to above.
  areaBelow -= cutAdjustment;
  areaAbove += cutAdjustment;

  return areaBelow >= areaAbove;
}

double solve(vector<vi> &squares) {
  int n = squares.size();

  // Sort squares by their bottom y-coordinate.
  sort(squares.begin(), squares.end(),
       [](const vi &a, const vi &b) { return a[1] < b[1]; });

  // Precompute the bottom y-coordinates for binary search.
  vector<long double> bottomYs(n);
  for (int i = 0; i < n; ++i) {
    bottomYs[i] = squares[i][1];
  }

  // Prepare an array for squares sorted by top y-coordinate (top = y + side).
  // We store pairs: {top, side}
  vector<pair<long double, int>> topPairs(n);
  for (int i = 0; i < n; ++i) {
    int y = squares[i][1], side = squares[i][2];
    topPairs[i] = {y + side, side};
  }
  sort(topPairs.begin(), topPairs.end());

  // Also extract the sorted top values.
  vector<long double> topYs(n);
  for (int i = 0; i < n; ++i) {
    topYs[i] = topPairs[i].first;
  }

  // Precompute prefix sums for squares sorted by bottom y:
  // 1. prefixArea: cumulative sum of square areas (side^2)
  // 2. prefixWeightedTop: cumulative sum of top*side [top = bottom + side]
  // 3. prefixSide: cumulative sum of side lengths.
  vll prefixArea(n + 1, 0), prefixWeightedTop(n + 1, 0),
      prefixSide(n + 1, 0);
  for (int i = 0; i < n; ++i) {
    ll side = squares[i][2];
    prefixArea[i + 1] = prefixArea[i] + side * side;
    prefixWeightedTop[i + 1] =
        prefixWeightedTop[i] + (squares[i][1] + side) * side;
    prefixSide[i + 1] = prefixSide[i] + side;
  }

  // Precompute prefix sums for squares sorted by top y:
  // 1. prefixWeightedTopV2: cumulative sum of (top) * side
  // 2. prefixSideTop: cumulative sum of side lengths.
  vll prefixWeightedTopV2(n + 1, 0), prefixSideTop(n + 1, 0);
  for (int i = 0; i < n; ++i) {
    ll side = topPairs[i].second;
    prefixWeightedTopV2[i + 1] = prefixWeightedTopV2[i] + topPairs[i].first * side;
    prefixSideTop[i + 1] = prefixSideTop[i] + side;
  }

  // Binary search for the minimum y that balances the area.
  // The search range is from 0 to the maximum top among the squares.
  double lo = 0.0, hi = topYs.back(); // hi can be set to 1e9+5 as well
  double ans = hi;
  double eps = 1e-5;

  // We run a fixed number of iterations (60) to ensure the answer converges
  // within the acceptable error of 1e-5.
  for (int iter = 0; iter < 50; ++iter) {
    long double mid = lo + (hi - lo) / 2.0;
    if (check(mid, bottomYs, prefixArea, prefixWeightedTop, prefixSide,
              topYs, prefixWeightedTopV2, prefixSideTop)) {
      ans = mid;
      hi = mid - eps;
    } else {
      lo = mid + eps;
    }
  }

  return ans;
}
```

## Related
