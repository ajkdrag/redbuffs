---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[2 Zettels/frequency arrays\|frequency arrays]]

If your input contains negative numbers, you can use an offset to map them to positive indices

```cpp
vector<int> computeFrequencyWithOffset(const vector<int>& arr) {
    int min_val = *min_element(arr.begin(), arr.end());
    int max_val = *max_element(arr.begin(), arr.end());
    int offset = -min_val;
    vector<int> freq(max_val - min_val + 1, 0);
    for (int num : arr) freq[num + offset]++;
    return freq;
}
```
## Related
- [[2 Zettels/frequency arrays using coordinate compression\|frequency arrays using coordinate compression]]