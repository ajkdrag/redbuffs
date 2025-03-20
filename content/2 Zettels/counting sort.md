---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-03-19T21:25:34.871+05:30"}
---


> [!Topics]
> - [[sorting algorithms\|sorting algorithms]]

Counting Sort is a non-comparison-based sorting algorithm that is particularly efficient for sorting integers within a known range. It works by counting the occurrences of each unique value in the input array and then using this information to place each value in its correct position in the output array.

## Algorithm 

- **Count Frequencies**: Create a frequency array where each index represents an element and the value at that index represents its count
- **Cumulative Count**: Modify the frequency array such that each element at each index stores the sum of previous counts. This helps in determining the position of each element in the sorted output
- **Build Output Array**: Create an output array and place each element in its correct position based on the cumulative counts

### Time Complexity
- **Best Case:** $O(n + k)$
- **Average Case:** $O(n + k)$
- **Worst Case:** $O(n + k)$

Where:
- $n$ is the number of elements in the input array.
- $k$ is the range of the input values (i.e., the difference between the maximum and minimum values).

### Space Complexity
- $O(k)$ for the counting array

> [!Note]
> [[2 Zettels/counting sort is stable\|counting sort is stable]] in nature, i.e. the relative ordering of equal elements is preserved.

## Code
```cpp
void countingSort(vector<int>& arr) {
    int max_val = *max_element(arr.begin(), arr.end());
    vector<int> count(max_val + 1, 0);
    vector<int> output(arr.size());

    // Count occurrences of each element
    for (int &num : arr) {
        count[num]++;
    }

    // Update the count array to hold the actual position of elements
    for (int i = 1; i <= max_val; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    // Copy the sorted elements back into the original array
    arr = output;
}

int main() {
    vector<int> arr = {4, 2, 2, 8, 3, 3, 1};
    countingSort(arr);
    for (int &num : arr) {
        cout << num << " ";
    }
    return 0;
}
```

## Applications
- Particularly useful for sorting integers or objects that can be mapped to integers, especially when the range of input values $k$ is known and not excessively large. It is commonly used in scenarios like:
    - Sorting scores in a grading system.
    - Sorting elements in a limited range, such as ages or scores.
- Often used as a subroutine in other sorting algorithms, such as [[radix sort\|radix sort]].

## Related
- [[bucket sort\|bucket sort]]
- [[radix sort\|radix sort]]