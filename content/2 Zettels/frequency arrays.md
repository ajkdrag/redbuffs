---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-02-11T11:54:06.505+05:30"}
---


> [!Topics]
> - [[arrays\|arrays]]

An array where each index represents an element, and the value at that index represents its count. Efficient when element range is small and known.

Elements: `[2, 3, 2, 5]`  
Frequency Array: `[0, 0, 2, 1, 0, 1]` (indices 0–5)

```cpp
vector<int> computeFrequency(const vector<int>& arr, int max_val) {
    vector<int> freq(max_val + 1, 0);
    for (int num : arr) freq[num]++;
    return freq;
}
```

### Applications and Usages
- [[counting sort\|counting sort]]
- finding majority elements (occurring more than `n/2` times, etc.)
- string algorithms (checking anagrams)
- tracking frequencies in [[sliding window\|sliding window]]
- range queries: how many elements lie in `[a, b]` using prefix sums.

### Variations
- [[2 Zettels/frequency arrays using coordinate compression\|frequency arrays using coordinate compression]]: when the range of values is very large (e.g., up to 10^9), but the number of distinct elements is relatively small
- character frequency arrays: `for (char c : s) freq[c - 'a']++;`
- [[2 Zettels/frequency arrays for negative numbers\|frequency arrays for negative numbers]]: uses offset technique
## Related
