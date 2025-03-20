---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-03-19T12:18:37.676+05:30"}
---


> [!Topics]
> - [[combinatorics\|combinatorics]]

This note compiles various techniques for counting subarrays within an array or string, often used in problems involving [[2 Zettels/contribution technique\|contribution technique]] and combinatorial analysis.  We'll cover different scenarios and how to approach them.

## 1. Total Number of Subarrays

Given an array (or string) of length `n`, the total number of possible subarrays is given by:
$$
\text{Total Subarrays} = \binom{n+1}{2} = \frac{n(n+1)}{2}
$$

**Explanation:**  A subarray is defined by its starting and ending indices.  We can choose two indices (possibly the same) from `n+1` possible positions (think of the positions *between* elements, plus the start and end).  This is equivalent to choosing 2 items from `n+1` with replacement, which is a combination with repetition problem. Alternatively, you can think of it as summing the number of subarrays starting at each index: `n + (n-1) + (n-2) + ... + 1`, which also equals `n(n+1)/2`.

**Example:**  For an array `[a, b, c]` (n=3), the subarrays are: `[a]`, `[a, b]`, `[a, b, c]`, `[b]`, `[b, c]`, `[c]`.  There are 6 subarrays, and `3 * (3+1) / 2 = 6`.

## 2. Subarrays Containing a Specific Element

If we want to count the number of subarrays that *contain* a specific element at index `i`, we can use the following approach:

*   **Left Boundary Choices:**  The subarray can start at any index from 0 up to and including `i`.  This gives us `i + 1` choices
*   **Right Boundary Choices:** The subarray can end at any index from `i` up to and including `n-1`.  This gives us `n - i` choices

Therefore, the total number of subarrays containing the element at index `i` is:
$$
\text{Subarrays Containing } a[i] = (i + 1) \times (n - i)
$$
**Example:** In the array `[a, b, c, d]` (n=4), consider the element `c` at index `i=2`.
*   Left boundary choices: `[a, b, c]`, `[b, c]`, `[c]`  (3 choices, or $2+1$)
*   Right boundary choices: `[c]`, `[c, d]` (2 choices, or $4-2$)
*   Total subarrays containing `c`: $3 \times 2 = 6$

This is heavily used in problems like calculating the [[2 Zettels/contribution technique#A. Sum of All Subarrays\|sum of all subarrays]].  Each element `a[i]` contributes its value multiplied by the number of subarrays it's present in.

## 3. Subarrays with Specific Properties (Contribution Technique)

Many problems require counting subarrays that satisfy a particular condition. The **contribution technique** is often useful here.  Instead of iterating through all possible subarrays, we iterate through each element (or each unique element) and determine how many subarrays *satisfy the condition* due to that element.

### Example Problems:

* [[6 Problems/count unique chars in all substrings\|count unique chars in all substrings]]:  For each character at index `i`, we find the previous (`lpos[i]`) and next (`rpos[i]`) occurrences of the same character.  The number of substrings where `s[i]` is the *unique* occurrence of that character is `(i - lpos[i]) * (rpos[i] - i)`.  This is a direct application of the "subarrays containing a specific element" principle, but with constraints on the boundaries

* [[6 Problems/appeals of all substrings#Approach 1 (Contribution technique)\|appeals of all substrings#Approach 1 (Contribution technique)]]:  Similar to the above, we count substrings where `s[i]` is the *first* occurrence of that character.  The contribution of `s[i]` is `(i - prev_i) * (n - i)`, where `prev_i` is the index of the previous occurrence

* [[6 Problems/appeals of all substrings#Approach 3 (Contribution Technique + Combinatorics)\|appeals of all substrings#Approach 3 (Contribution Technique + Combinatorics)]]: Here, we count substrings that *do not* contain a specific character. We divide the string into chunks of characters not equal to the target character. For a chunk of size `k`, there are `k(k+1)/2` substrings

## 4. Subarrays with Sum Constraints (Prefix Sums)
Problems that involve counting subarrays whose sum meets certain conditions (e.g., sum at most K, sum equals K) often benefit from using [[2 Zettels/prefix sums\|prefix sums]].

### Example Problems:
* [[2 Zettels/two pointers + prefix sums array#\|subarrays with sum atmost K]]: By calculating the prefix sums, you can efficiently determine the sum of any subarray in $O(1)$. Combined with [[2 Zettels/two pointers technique\|two pointers technique]], you can efficiently count subarrays meeting the sum constraint.

## Related
