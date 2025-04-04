---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-01-26T12:13:20.692+05:30"}
---


> [!Topics]
> - [[sliding window\|sliding window]]

This technique uses a dynamic window `[left, right]` (often termed `[tail, head]`) that expands and contracts to find optimal subarrays or substrings satisfying certain conditions. Unlike [[2 Zettels/sliding window with fixed window size\|sliding window with fixed window size]], the size isn't fixed.

**Core Idea:**
1.  **Expansion (head pointer):** For a given `tail` position, the `head` pointer expands the window (`head++`) as far as possible, adding elements one by one, *as long as* some condition is satisfied for the window `[tail, head+1]`
2.  **Processing:** Once the `head` pointer cannot expand further (either reaching the end or violating the condition), the current window `[tail, head]` represents the largest valid window starting at `tail`. Process this window to update the answer (e.g., find max length, count valid windows)
3.  **Contraction (tail pointer):** The `tail` pointer moves one step forward (`tail++`) to explore the next potential starting position. Before the next expansion phase begins, we need to undo the "effect" of the *old* `tail` position (since it's not part of current window)

This process repeats, iterating through all possible start positions and finding the maximal valid window for each.

> [!Implementation Framework]
>
> For a structured approach to implementing variable window sliding window, especially in competitive programming, consider using the [[2 Zettels/sliding window with variable window size (snake framework)\|snake framework]]. This framework provides a template with `check_condition`, `update_state`, and `undo_update_state` functions to systematically handle window expansion and contraction.

> [!Question]- Given an array, find the longest subarray where the sum is less than or equal to k
> - Use `tail = 0, head = -1` and `current_sum = 0`
> - Iterate with `tail` from `0` to `n-1`:
>     1.  **Expansion:** While `head < n-1` and `current_sum + arr[head + 1] <= k`, increment `head` and add `arr[head]` to `current_sum`
>     2.  **Processing:** The maximal window starting at `tail` with sum `<= k` is `[tail, head]`. Update `max_length = max(max_length, head - tail + 1)`
>     3.  **Advance Tail:** Subtract `arr[tail]` from `current_sum` and increment `tail`
> - Time: $O(n)$ vs. brute-force $O(n^3)$.

> [!Question]- Find the length of the longest substring without repeating characters.
> - Use `tail = 0, head = -1` and a frequency map/set (`window_chars`) for characters in `s[tail...head]`.
> - Iterate with `tail` from `0` to `n-1`:
>     1.  **Expansion:** While `head < n-1` and `s[head + 1]` is not in `window_chars`, increment `head` and add `s[head]` to `window_chars`
>     2.  **Processing:** The maximal window starting at `tail` without repeats is `[tail, head]`. Update `max_length = max(max_length, head - tail + 1)`
>     3.  **Advance Tail:** Remove `s[tail]` from `window_chars` and increment `tail`
> - Time: $O(n)$ vs. brute-force $O(n^3)$

> [!Question]- Given an array and a target sum k. Find the number of subarrays whose sum equals k.
> **Note**: For arbitrary integers (including negatives), the [[prefix sum\|prefix sum]] with hash map approach is generally preferred ($O(n)$ time, $O(n)$ space). The sliding window approach below works efficiently for *non-negative* numbers.
> - Use `tail = 0, head = -1` and `current_sum = 0`. Initialize `count = 0`
> - Iterate with `tail` from `0` to `n-1`:
>     1.  **Expansion:** While `head < n-1` and `current_sum + arr[head+1] <= k`:
>         - Increment `head` and add `arr[head]` to `current_sum`
>     1.  **Processing:** If `current_sum == k`, increment `count`
>     2.  **Advance Tail:** Subtract `arr[tail]` from `current_sum` and increment `tail`
> - Time: $O(n)$ (for non-negative numbers)

## Related
- [[2 Zettels/sliding window with fixed window size\|sliding window with fixed window size]]
