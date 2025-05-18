---
{"publish":true,"created":"2025-02-24T11:29:56.070+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/contribution technique\|contribution technique]]
> - [[dynamic programming\|dynamic programming]]
> - [[combinatorics\|combinatorics]]

We are tasked with calculating the total appeal of all substrings of a string $s$, where the appeal of a substring is the number of distinct characters it contains. For example, the appeal of `"abbca"` is 3 because it contains 3 distinct characters: `'a'`, `'b'`, and `'c'`.

The goal is to compute the sum of the appeal of all possible substrings of $s$.

## Idea

### Approach 1 (Contribution technique)

We calculate how much each character in $s$ contributes to the total appeal across all substrings. Specifically, for each character $s[i]$, we determine the number of substrings where $s[i]$ is the **first occurrence** of its kind. This ensures that each distinct character in a substring is counted exactly once.

For any substring that includes $s[i]$ as its first appearance (i.e., no earlier occurrence of $s[i]$ appears in that substring), the starting index can be any position from $\text{prev} + 1$ to $i$ (yielding $i - \text{prev}$ choices), and the ending index can be any position from $i$ to the end of the string (yielding $n-i$ choices). Thus, $s[i]$ contributes to exactly $(i - \text{prev}) \times (n - i)$ substrings, and in each such substring, it **adds 1** to the distinct character count (or "appeal"). Thus,

$$
\text{Total Appeal} = \sum_{i=0}^{n-1} (i - \text{prev}_i) \times (n - i)
$$

where $\text{prev}_i$​ is the last index where $s[i]$ was seen, or -1 if it hasn't been seen before.

> Overcounting is prevented by ensuring that each character's contribution is **only counted** for those substrings where it **appears for the first time**. E.g. for `"abbca"`, any substring that contains both `'b'`s, such as `"abb"`, only has its distinct count incremented once—by the first `'b'`. The second `'b'` does not count substrings that already include the earlier occurrence.

**Time Complexity:** $O(n)$
**Space Complexity:** $O(1)$ (atmost 26 entires in hashmap/dictionary)

### Approach 2 (Dynamic Programming)

Consider a simple example `"cbcdec"`. How do you express F(5) (appeals of all substring ending at index 5) in terms of F(0), F(1), F(2), F(3), F(4) ?

Let say you know F(4). How does adding `c` into the first 5 characters change anything ?

- `"c"` is a substring with an appeal of 1 of itself so it adds 1
- `"c"` adds 1 to `"de" ("dec")`
- `"c"` adds 1 to `"e" ("ec")`
- `"c"` **doesn't add 1** to `"cde", "bcde", "cbcde"` because we already have a `c` in them, so (appeal of `"cdec"="cde", "bcdec"="bcde", "cbcdec"="cbcde"`)

In this case, `"c"` adds 1 + 2 to F(4). Mathematically, F(5) = F(4) + 1 + (current index of `"c"` - last index of `"c"` - 1). To generalize it, you have F(j) = F(j-1) + 1 + (`j` - `last_index[s[j]]` - 1). In the case there is no last index (i.e. first occurrence), you have F(j) = F(j-1) + 1 + j. This can be implemented neatly using a dictionary as such: `last_index.get(s[j], -1)`.

**Time Complexity:** $O(n)$
**Space Complexity:** $O(1)$ (atmost 26 entires in hashmap/dictionary)

### Approach 3 (Contribution Technique + Combinatorics)

In Approach 1, we were taking each character `s[i]` and finding out its contribution. Here we are taking each **unique** character `ch` and trying to find its contribution. The contribution will be 1 for every substring that contains `ch`, i.e. the total number of substrings that containg `ch`. We solve this indirectly by calculating the number of substrings that _do not_ contain `ch` and subtracting this from the total number of substrings.

Consider `s = "bbacbaba"` and we want to count substrings that do not contain `a`. Visualize this as chunks of characters != `a`. Here, chunks will be: `{bb, cb, b}`. Each chunk can create substrings in $\binom{k[i]+1}{2}$ ways, where $k[i] = \text{chunk[i].size()}$ (refer [[2 Zettels/counting subarrays\|counting subarrays]] to understand how a string of size $n$ will have $\binom{n+1}{2}$ substrings). The count of substrings that don't contain `a` will be the sum of num_substrings from each chunk. We do this for each unique character in `s` (here `a, b, c`) and sum it up. Final ans will be the complement: `num_possible_substrings - sum`.

**Time Complexity:** $O(26\cdot n)=O(n)$ (atmost 26 unique characters in string)
**Space Complexity:** $O(1)$ (can even avoid `set(s)` by using `string.ascii_lowercase`)

## Code

```python
# Approach 1 (Contrib technique)
class Solution:
    def appealSum(self, s: str) -> int:
        seen = {}
        n = len(s)

        res = 0
        for idx, val in enumerate(s):
            left = idx - seen.get(val, -1)
            right = n - idx
            res += left * right
            seen[val] = idx
        return res

# Approach 2 (DP)
class Solution:
    def appealSum(self, s):
        total_appeals = 0
        appeals_ending_at_j_minus_1 = 0
        last_index = {}

        for j, c in enumerate(s):
            appeals_ending_at_j = appeals_ending_at_j_minus_1 + 1 + (j - last_index.get(c, -1) - 1)

            last_index[c] = j
            total_appeals += appeals_ending_at_j
            appeals_ending_at_j_minus_1 = appeals_ending_at_j
        return total_appeals

# Approach 3 (Contrib technique + Combinatorics)
class Solution:
    def appealSum(self, s):
        n = len(s)
        total_subs = n * (n + 1) // 2
        ans = 0
        for char in set(s):
            count_non_char_subs = 0
            curr_len = 0
            for c in s:
                if c != char:
                    # chunk starts, so keep counting
                    curr_len += 1
                else:
                    # chunk ended, perform updates and reset count
                    count_non_char_subs += curr_len * (curr_len + 1) // 2
                    curr_len = 0
            # don't forget the "last chunk"
            count_non_char_subs += curr_len * (curr_len + 1) // 2

            ans += total_subs - count_non_char_subs
        return ans
```

## Related
