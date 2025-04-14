---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-14T11:55:32.967+05:30"}
---


> [!Topics]
> - [[2 Zettels/two pointers technique\|two pointers technique]]
> - [[string algorithms\|string algorithms]]

A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward.

```
string input: "racecar"
output: true

array input: [0, 1, 2, 1, 0]
output: true

linked list input: 1 -> 2 -> 3 -> 2 -> 1
output: true
```

There are several ways to validate palindromes, but the most common method is to use the [[2 Zettels/two pointers technique\|two pointers technique]]:

1. Initialize two pointers, `left` and `right`, at the start and end of the sequence, respectively
2. Compare the characters at `left` and `right`. If they are not equal, the sequence is not a palindrome
3. Move `left` one step forward and `right` one step backward
4. Repeat steps 2 and 3 until `left` is greater than or equal to `right`

```cpp
bool is_palindrome(string s) {
  int left = 0;
  int right = s.length() - 1;

  while (left < right) {
    if (s[left] != s[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
```

**Time Complexity:** $O(n)$  
**Space Complexity:** $O(1)$

Alternatively, there are other approaches like using a stack or recursion, but they are less efficient.

## Related