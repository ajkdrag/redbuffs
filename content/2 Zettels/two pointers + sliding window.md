---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[sliding window\|sliding window]]
> - [[2 Zettels/two pointers technique\|two pointers technique]]

> [!Question]- Given an array, find the longest subarray where the sum is less than or equal to k
> - Use the sliding window approach with two pointers `left = right = 0`
> - Adjust the window by expanding the `right` pointer and shrinking the `left` pointer when the sum exceeds `k`
>     - `while current_sum > k: current_sum -= arr[left++]`
> - Time: $O(n)$ vs. brute-force $O(n^3)$ (checking all subarrays).

> [!Question]- Find the length of the longest substring without repeating characters.
> - `left` and `right` pointers define a sliding window.
> - A hash map (`char_map`) stores the *most recent index* of each character in the current window.
> - While `right` is within string bounds:
>     - If `s[right]` is in `char_map`: Move `left` to `max(left, char_map[s[right]] + 1)` (move `left` past the previous occurrence)
>     - Update most recent index for curr char: `char_map[s[right]] = right`
>     - Update `max_length = max(max_length, right - left + 1)`
>     - Increment `right`
> - Time: $O(n)$ vs. brute-force $O(n^3)$ (checking all substrings).

> [!Question]- Given two strings s1 and s2, return true if s2 contains a permutation of s1
> - Use a sliding window of the size of `s1` over `s2`. Use [[frequency maps\|frequency maps]] (or [[arrays\|arrays]]) to check if the current window is a permutation of `s1`

> [!Question]- Given two strings s and t, find the minimum window in s which will contain all the characters in t
> - Use two pointers (`left` and `right`) to define a window in `s`
> - Use a hash map to store the character counts of `t`
> - Expand the right pointer until the window contains all characters of `t` (checking against the hash map)
> - Shrink the `left` pointer *as much as possible* while still maintaining the condition that the window contains all characters of `t`. This is where we minimize the window size

## Related
