---
{"publish":true,"tags":["type/problem"],"platform":"Leetcode","link":"https://leetcode.com/problems/count-vowel-substrings-of-a-string/description/","PassFrontmatter":true,"created":"2025-03-03T10:52:28.836+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/contribution technique\|contribution technique]]
> - [[sliding window\|sliding window]]

A vowel substring is a substring that **only** consists of vowels and has **all five** vowels present in it. Given a string `word`, return the number of **vowel substrings** in `word`.

```
Input: word = "aeiouu"
Output: 2
Explanation: The vowel substrings of word are as follows:
- "aeiouu"
- "aeiouu"
```

## Idea

We can solve this problem by "contributing" the number of valid substrings ending at each index in the word. The idea is to consider only _continuous segments of vowels_. When all vowels have been seen, determine the leftmost (smallest) index among these. Let’s call it `min_last`. Every substring ending at `i` that starts between the current segment's start index (say `L`) and `min_last` will contain all five vowels. Number of such substrings is $\text{min\_last} - L + 1$.

Example for string `cuaieuouac` at Index 6 (`'o'`):

- Update `last_seen['o'] = 6`, all vowels are now present: `{a:2, e:4, i:3, o:6, u:5}`
- The earliest (minimum) last seen index among these is **a=2**
  - This means substring `[2, 6]` is the shortest valid one ending at `i=6`
- Since our **all-vowels-segment** started at index 1, all substrings ending at index 6 and starting between indices 1 and 2 are valid
  - `uaieuo` and `aieuo`
- Contribution: 2 - 1 + 1 = 2

## Code

```python
class Solution:
    def countVowelSubstrings(self, word: str) -> int:
        vowels = set("aeiou")
        n = len(word)
        total = 0
        start = 0  # Start of the current continuous vowel segment.
        last_seen = {}

        for i, ch in enumerate(word):
            if ch not in vowels:
                # Reset when a non-vowel is encountered.
                start = i + 1
                last_seen = {}
                continue

            # Update the last seen index for the current vowel.
            last_seen[ch] = i

            if len(last_seen) == 5:
                # The earliest index among the last seen vowels.
                min_last = min(last_seen.values())
                total += (min_last - start + 1)

        return total
```

## Related

- [Substrings containing all 3 chars](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/)
