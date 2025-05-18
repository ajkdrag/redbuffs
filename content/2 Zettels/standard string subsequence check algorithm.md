---
{"publish":true,"created":"2025-03-13T13:20:30.097+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[string algorithms\|string algorithms]]
> - [[2 Zettels/two pointers technique\|two pointers technique]]

Given two strings, `text` and `pattern`, determine if `pattern` is a subsequence of `text`.  A subsequence is formed by deleting zero or more characters from `text` without changing the order of the remaining characters.

**Algorithm (Two Pointers):**
Use two pointers, `i` for `text` and `j` for `pattern`. Iterate through `text`. If `text[i]` matches `pattern[j]`, increment both `i` and `j`. Otherwise, increment only `i`. If `j` reaches the end of `pattern`, then `pattern` is a subsequence of `text`.

```cpp
bool isSubsequence(const std::string& text, const std::string& pattern) {
    int i = 0, j = 0;
    while (i < text.length() && j < pattern.length()) {
        if (text[i] == pattern[j]) {
            j++;
        }
        i++;
    }
    return j == pattern.length();
}
```

**Complexity:**
- **Time:** $O(\text{len}(\text{text}))$ - in the worst case, we iterate through the entire `text` string
- **Space:** $O(1)$

## Related
