---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-03-19T20:18:57.160+05:30"}
---


> [!Topics]
> - [[bit manipulation\|bit manipulation]]
> - [[power set\|power set]]

Bitmasking is a powerful technique for generating all possible subsequences (aka a **power set**) of a given set or string. Each subsequence can be represented by a binary number (mask), where each bit indicates whether to *include* a particular element in the subsequence.

Given a set of size `n`, we can represent all possible subsequences using integers from `0` to `2^n - 1`. Each integer corresponds to a bitmask, where the `i-th` bit is `1` if the `i-th` element is included in the subsequence, and `0` otherwise.

### Steps to Generate Subsequences

1. Loop through all integers from `0` to `2^n - 1`
2. For each integer (bitmask), check each bit:
   - If the `i-th` bit is set, include the `i-th` element in the current subsequence
3. Store or print the generated subsequence

### Example Code

```cpp
void generateSubsequences(const string &str) {
  int n = str.length();
  int totalSubsequences = 1 << n; // 2^n

  for (int mask = 0; mask < totalSubsequences; ++mask) {
    string subsequence;
    for (int i = 0; i < n; ++i) {
      // Check if the i-th bit is set
      if (mask & (1 << i)) {
        subsequence += str[i];
      }
    }
    cout << subsequence << endl; // Print the current subsequence
  }
}
```

- **Time Complexity:** The time complexity of this approach is $O(n \cdot 2^n)$, where $2^n$ is the number of subsequences and $n$ is the length of the string. This is because for each of the $2^n$ masks, we may need to check up to $n$ bits
- **Space Complexity:** The space complexity is $O(n)$ for storing the current subsequence being generated

## Related
