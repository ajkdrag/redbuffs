---
{"publish":true,"created":"2025-03-02T14:43:55.829+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/contribution technique\|contribution technique]]

The problem asks us to calculate the sum of scores of all substrings of a given string. Score of a string is the number of unique characters present in the string.

Example string = "aac"
Substring and score = ("a",1), ("aa",0), ("aac",1), ("a",1), ("ac",2), ("c",1)
**Total score** = 6

## Idea

Instead of iterating through all substrings, we iterate through each position $i$ in the original string $S$ and calculate its contribution to the total score. This approach focuses on how many substrings are "influenced" by each position in the string.

To implement this efficiently, we precompute two arrays, `lpos` and `rpos`. For each index $i$, `lpos[i]` stores the index of the last occurrence of character $S[i]$ before index $i$ (or -1 if no such occurrence exists). Similarly, `rpos[i]` stores the index of the next occurrence of $S[i]$ after index $i$ (or $n$ if no such occurrence). These arrays can be computed in linear time using forward and backward scans. The contribution of each index $i$ to the total score is then calculated:

$$
(i-\text{lpos[i]})\times (\text{rpos[i]} - i)
$$

This is because this char $S[i]$ will contribute 1 to substrings where it's unique, i.e substrings whose start position is in range $[\text{lpos[i]}+1, i]$ and end position is in range $[i, \text{rpos[i]}-1]$. Basic [[2 Zettels/counting subarrays\|counting subarrays]] yields us the above product. Summing these contributions for all indices $i$ from 0 to $n-1$ gives the final answer.

**Time Complexity:** $O(N)$ per test case.

## Code

```cpp
int solve(int n, string s) {
    // Stores last seen position of each char (A-Z)
    vector<int> pos(26, -1);

    vector<int> lpos(n);
    vector<int> rpos(n);

    for (int i = 0; i < n; ++i) {
        int char_value = s[i] - 'A';
        lpos[i] = pos[char_value];
        pos[char_value] = i;
    }

    // Reset for right-to-left pass
    fill(all(pos), n);

    for (int i = n - 1; i >= 0; --i) {
        int char_value = s[i] - 'A';
        rpos[i] = pos[char_value];
        pos[char_value] = i;
    }

    ll result = 0;
    for (int i = 0; i < n; ++i) {
        int distance_to_prev = i - lpos[i];
        int distance_to_next = rpos[i] - i;
        result += (1LL * distance_to_prev * distance_to_next);
    }

    return result;
}
```

## Related
