---
{"publish":true,"tags":["type/problem"],"platform":"AtCoder","link":"https://atcoder.jp/contests/abc143/tasks/abc143_d","PassFrontmatter":true,"created":"2025-03-16T17:07:06.434+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[range queries\|range queries]]
> - [[combinatorics\|combinatorics]]

Given a set of stick lengths, count the number of distinct triangles that can be formed. A valid triangle must satisfy the triangle inequality: the sum of any two sides must be greater than the third side (a + b > c, a + c > b, b + c > a).

## Idea

### Approach 1: Binary Search

- **Core Idea:** For each pair of sticks (a, b), use binary search to efficiently count the number of sticks 'c' that satisfy the triangle inequality.
- **Detailed Steps:**

    - **Sort:** Sort the stick lengths in ascending order. This is crucial for applying binary search
    - **Iterate:** Iterate through all possible pairs of sticks (a, b) where `a <= b`. We can assume `a <= b` without loss of generality because the order of selecting the first two sides doesn't matter
    - **Binary Search:** For each pair (a, b), we need to find the number of sticks 'c' such that `|a - b| < c < a + b`. Since the array is sorted and `a <= b`, we know `|a - b| = b - a`. Also, because the sticks are sorted, if `c > b`, then `c > a` as well. Thus, we only need to ensure `c < a + b`. We can use binary search to find the _index_ of the first element _greater than or equal to_ `a + b`. Let this index be `right`
    - **Count Valid 'c':** The valid values for 'c' will be all the elements _after_ 'b' and _before_ `a + b`. Since the array is sorted, these are the elements with indices from `j + 1` (where `j` is the index of 'b') up to, and including, `right - 1`. The number of valid 'c' values is therefore `(right - 1) - (j + 1) + 1 = right - j - 1`
    - **Accumulate:** Add the count of valid 'c' values for the current (a, b) pair to the total count of triangles

- **Implementation Nuances:**

    - Use `bisect.bisect_left(lengths, upper_bound, lo=left)` in Python. The `lo=left` parameter is _essential_ to restrict the search to the portion of the array _after_ 'b'. Without it, you'll overcount
    - Handle edge cases carefully. If `right` is equal to `j+1` (meaning no elements are strictly less than a+b), the count is 0

- **Time Complexity:** $O(n^2 \log{n})$. The nested loops contribute $O(n^2)$, and the binary search within each iteration takes $O(\log{n})$.
- **Space Complexity:** $O(1)$. We only use a constant amount of extra space.

### Approach 2: Combinatorics and Range Queries (Frequency Array)

- **Core Idea:** Iterate through possible lengths for the _longest_ side ('c') of the triangle. For each 'c', use a frequency array to efficiently count valid combinations of the other two sides ('a' and 'b') using range queries and combinatorial principles. The key is that we're counting how many sticks fall within specific length ranges.
- **Detailed Steps:**

    - **Frequency Array:** Create a frequency array `freq` where `freq[i]` stores the number of sticks with length _exactly_ `i`. The problem statement provides an upper bound on stick lengths (e.g., 1000 or 2000), which dictates the size of this array. This is crucial for efficiency
    - **Iterate over Longest Side:** Iterate through each possible length `i` from the maximum possible length down to 1, considering `i` as the longest side 'c' of the triangle
    - **Case A: Two or Three Sides Equal to 'c':**
        - If `freq[i]` (which we'll call `cnt_i`) is greater than or equal to 2, we can form triangles of the form (i, i, x) where `x < i`. We need to count the number of sticks with length `x` such that `x + i > i` (triangle inequality), which simplifies to `x > 0`. Since stick lengths are positive, _any_ `x < i` will work
        - The number of such triangles is `C(cnt_i, 2) * (number of sticks with length < i)`. We can find the "number of sticks with length < i" by summing the frequencies from 1 to `i-1`. This is a [[range query on frequency array\|range query on frequency array]]
        - If `cnt_i >= 3`, we can also form a triangle with all sides equal to 'i': (i, i, i). The number of such triangles is `C(cnt_i, 3)`
    - **Case B: One Side Equal to 'c', Two Other Sides 'j':**
        - Iterate through possible lengths 'j' from `i - 1` down to `i // 2 + 1` (we need `j + j > i` (triangle inequality), which simplifies to `j > i / 2`)
        - For each 'j', let `cnt_j = freq[j]`
        - **Subcase B1: (i, j, x) where x < j:** We need `j + x > i`, so `x > i - j`. We also have `x < j`. We need to count the number of sticks with lengths in the range `(i - j, j)`. This is a range query on the frequency array: `sum(freq[k] for k in range(i - j + 1, j))`.
        - Multiply this count by `cnt_i` (number of ways to choose 'i') and `cnt_j` (number of ways to choose 'j').
        - **Subcase B2: (i, j, j):** If `cnt_j >= 2`, we can form triangles with sides (i, j, j). The number of such triangles is `cnt_i * C(cnt_j, 2)`.

- **Implementation Nuances:**

    - **Range Queries:** The core of this approach is efficiently performing range queries on the `freq` array. We can calculate prefix sums from `freq` to make these O(1)
    - **Integer Division:** Use integer division (`//`) to avoid floating-point issues
    - **Combinations:** Calculate combinations (`C(n, k)`) efficiently. For small values, you can precompute them or use the formula directly: `C(n, 2) = n * (n - 1) // 2` and `C(n, 3) = n * (n - 1) * (n - 2) // 6`
    - **Overflow:** If the number of sticks or the maximum length is large, use 64-bit integers to prevent potential overflow when calculating combinations or sums

- **Time Complexity:** $O(n + m^2)$, where 'n' is the number of sticks and 'm' is the maximum possible stick length. Building the frequency array is O(m). The nested loops (iterating over 'i' and 'j') take at most $O(m^2)$ time. The range queries are done in constant time.
- **Space Complexity:** $O(m)$. The space is dominated by the frequency array.

## Code

```python
# Approach 1 (Binary Search)
import sys
import bisect

def solve(lengths):
    lengths.sort()  # Sort the lengths in ascending order
    n = len(lengths)
    count = 0

    for i in range(n):
        for j in range(i + 1, n):
            a = lengths[i]
            b = lengths[j]
            upper_bound = a + b

            # Count sticks 'c' such that  c < upper_bound
            left = j + 1  # Start searching after b
            right = bisect.bisect_left(lengths, upper_bound, lo=left)
            # valid range: [left, right - 1]
            count += (right - 1) - left + 1

    return count

# Approach 2 (Prefix sums and Combinatorics)
def solve(sticks):
    # Step 1: Frequency array up to length 1001
    freq = [0] * 1002
    for length in sticks:
        freq[length] += 1

    # Step 2: Convert freq into a prefix sum array
    # freq[i] will then represent the total number of sticks of length <= i
    for i in range(1, 1002):
        freq[i] += freq[i - 1]

    res = 0

    # Step 3: Iterate over each possible longest side i (descending)
    for i in range(1001, 0, -1):
        # Number of sticks exactly of length i
        cnt_i = freq[i] - freq[i - 1] if i > 0 else freq[i]
        if cnt_i == 0:
            continue

        # Case A: 2 or 3 sticks of the same length i
        #   - (i, i, x) where x < i, ensuring x + i > i  => x > 0 always holds if x >= 1
        #   - (i, i, i)
        if cnt_i >= 2:
            # Choose 2 from cnt_i, and 1 from all sticks < i
            # Combination: C(cnt_i, 2) * number_of_sticks_of_length_<_i
            res += (cnt_i * (cnt_i - 1) // 2) * freq[i - 1]

            # If cnt_i >= 3, we can also form a triangle using 3 sticks of length i
            # Combination: C(cnt_i, 3)
            if cnt_i >= 3:
                res += (cnt_i * (cnt_i - 1) * (cnt_i - 2)) // 6

        # Case B: One stick of length i, two sticks of length j (j < i)
        # We need j + j > i => j > i/2, so j >= floor(i/2) + 1
        # Hence we iterate j from i-1 down to (i//2 + 1)
        lower_bound = max(1, i // 2 + 1)
        for j in range(i - 1, lower_bound - 1, -1):
            cnt_j = freq[j] - freq[j - 1]
            if cnt_j == 0:
                continue

            # For sides (i, j, x) with x < j:
            # The triangle inequality requires: j + x > i => x > i - j
            # So we need x > (i - j). The number of sticks x with length > (i - j) and < j
            # can be counted by freq[j - 1] - freq[i - j]
            needed = i - j
            available_smaller = freq[j - 1] - freq[needed]
            res += cnt_i * cnt_j * available_smaller

            # Additionally, if we can pick two sticks of length j (and one stick of length i),
            # we must ensure j + j > i, but that is already ensured by j >= i//2+1
            # So we can form combinations: (i, j, j)
            if cnt_j >= 2:
                # Choose 2 from cnt_j
                res += cnt_i * (cnt_j * (cnt_j - 1) // 2)

    return res

```

## Related
