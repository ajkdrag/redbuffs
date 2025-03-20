---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-03-20T11:44:42.515+05:30"}
---


> [!Topics]
> - [[sorting algorithms\|sorting algorithms]]

Selection Sort is a simple, **comparison-based** sorting algorithm.  It works by repeatedly finding the minimum element (or maximum, depending on the desired order) from the unsorted portion of the array and placing it at the beginning (or end) of the sorted portion.  The algorithm divides the array into two parts: a sorted subarray, which is built up from left to right, and the remaining unsorted subarray.

## Algorithm and Dry Run

The algorithm works as follows:

1.  **Outer Loop:** Iterate from the beginning of the array to the second-to-last element (`i` from 0 to `n-2`).  Each iteration of the outer loop expands the sorted subarray by one element
2.  **Find Minimum:**  Find the minimum element in the unsorted subarray (from index `i` to the end of the array).  Keep track of the *index* of the minimum element.
3.  **Swap:** Swap the minimum element found in step 2 with the first element of the unsorted subarray (the element at index `i`)
4.  **Sorted Subarray:** The sorted subarray now includes the element at index `i`.  The unsorted subarray shrinks by one element

> [!NOTE]
> Selection sort is **not** a [[2 Zettels/stable sorting algorithm\|stable sorting algorithm]]. The swapping of the minimum element with the current element can disrupt the order of equal elements.

### Dry Run

Let's sort the array `[2a, 2b, 1]` in ascending order.  Here, `2a` and `2b` represent two elements with the same value (2), but we've added 'a' and 'b' to distinguish their original order.

* **Pass 1:**
    * `[**2a**, 2b, 1]`  Minimum element: 1 (at index 2)
    * `[**1**, 2b, **2a**]` (swap 2a and 1)

* **Pass 2:**
    * `[1, **2b**, 2a]` Minimum Element: 2b (at index 1)
    * `[1, **2b**, 2a]` (No swap)

Notice that the relative order of `2a` and `2b` has been *reversed*.  `2a` originally came before `2b`, but after the sort, `2b` comes before `2a`. This demonstrates the **instability** of Selection Sort. A stable sort would have produced `[1, 2a, 2b]`.
## Code

```cpp
void selectionSort(vector<int> &arr) {
    int n = arr.size();

    for (int i = 0; i < n - 1; ++i) {
        // Find the minimum element in the unsorted portion
        int min_idx = i;
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }

        // Swap the found minimum element with the first element of the unsorted portion
        if (min_idx != i) {
            swap(arr[i], arr[min_idx]);
        }
    }
}
```

### Time and Space Complexity

* **Worst-case Time Complexity:** $O(n^2)$.  The outer loop runs `n-1` times, and the inner loop (finding the minimum) runs, on average, `n/2` times.  This results in a quadratic time complexity
* **Average-case Time Complexity:** $O(n^2)$. Similar to the worst case
* **Best-case Time Complexity:** $O(n^2)$.  Even if the array is already sorted, the algorithm still performs all the comparisons
* **Space Complexity:** $O(1)$. Selection Sort is an **in-place** algorithm, as it only uses a constant amount of extra space

> [!Warning]
> Selection Sort, like [[2 Zettels/bubble sort\|bubble sort]], is inefficient for large datasets due to its quadratic time complexity.  It's simple to understand and implement, but other algorithms like [[merge sort\|merge sort]] or [[quick sort\|quick sort]] are much better choices for larger arrays.

## Related
- [[2 Zettels/bubble sort\|bubble sort]]
- [[2 Zettels/insertion sort\|insertion sort]]