---
{"publish":true,"created":"2025-02-11T15:09:45.236+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/frequency array\|frequency array]]

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

- [[2 Zettels/frequency array using coordinate compression\|frequency array using coordinate compression]]
