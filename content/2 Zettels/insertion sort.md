---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-03-20T11:11:21.750+05:30"}
---


> [!Topics]
> - [[sorting algorithms\|sorting algorithms]]
> - [[2 Zettels/stable sorting algorithm\|stable sorting algorithm]]

Insertion Sort is a simple, **comparison-based** sorting algorithm that builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as [[quick sort\|quick sort]], [[heap sort\|heap sort]], or [[merge sort\|merge sort]]. However, insertion sort provides several advantages:

* Simple implementation
* Efficient for (quite) small data sets, just like [[2 Zettels/bubble sort\|bubble sort]]
* Adaptive: efficient for data sets that are already substantially sorted
* Stable: It maintains the relative order of elements with equal keys, as explained in [[2 Zettels/stable sorting algorithm\|stable sorting algorithm]]
* In-place: It requires only a constant amount $O(1)$ of additional memory space

## Algorithm and Dry Run

The algorithm works as follows:

1.  **Outer Loop:** Iterate from the second element (index 1) to the end of the array.  The first element is considered already "sorted" in a sub-array of size one
2.  **Key Element:**  For each iteration `i` of the outer loop, the element at `arr[i]` is the "key" element that needs to be inserted into its correct position in the already sorted sub-array `arr[0...i-1]`
3.  **Inner Loop (Reverse Iteration):** Iterate backwards from `i - 1` down to 0
4.  **Comparison and Shift:** Compare the key element with each element in the sorted sub-array.  If the key element is smaller than the current element being compared, shift the current element one position to the right. This creates space for the key element to be inserted.
5.  **Insertion:**  Once the correct position is found (either the key element is no longer smaller than the current element, or the beginning of the sub-array is reached), insert the key element into the created space.
6. **Termination:** After iterating through all elements, the array is sorted.

> [!NOTE]
> Insertion sort is a [[2 Zettels/stable sorting algorithm\|stable sorting algorithm]]. When inserting an element, it's placed *after* any existing elements with the same value, thus preserving the relative order of equal elements.

### Dry Run

Let's sort the array `[5, 2, 4, 6, 1, 3]` in ascending order:

*   **Iteration 1 (i = 1, key = 2):**
    *   `[**5**, **2**, 4, 6, 1, 3]`
    *   Compare 2 with 5.  2 < 5, shift 5 to the right: `[5, 5, 4, 6, 1, 3]`
    *   Insert 2 at index 0: `[2, 5, 4, 6, 1, 3]`

*   **Iteration 2 (i = 2, key = 4):**
    *   `[2, **5**, **4**, 6, 1, 3]`
    *   Compare 4 with 5.  4 < 5, shift 5 to the right: `[2, 5, 5, 6, 1, 3]`
    *   Compare 4 with 2.  4 > 2, insert 4 at index 1: `[2, 4, 5, 6, 1, 3]`

*   **Iteration 3 (i = 3, key = 6):**
    *   `[2, 4, **5**, **6**, 1, 3]`
    *   Compare 6 with 5. 6 > 5. Insert 6 at index 3: `[2, 4, 5, 6, 1, 3]`

*   **Iteration 4 (i = 4, key = 1):**
    *   `[2, 4, 5, **6**, **1**, 3]`
    *   Compare 1 with 6, 5, 4, and 2. Shift all to right: `[2, 4, 5, 6, 6, 3]` -> `[2, 4, 5, 5, 6, 3]` -> `[2, 4, 4, 5, 6, 3]` -> `[2, 2, 4, 5, 6, 3]`
    *   Insert 1 at index 0: `[1, 2, 4, 5, 6, 3]`

*   **Iteration 5 (i = 5, key = 3):**
    *   `[1, 2, 4, 5, **6**, **3**, ]`
    *   Compare 3 with 6, 5, 4. Shift: `[1, 2, 4, 5, 6, 6]` -> `[1, 2, 4, 5, 5, 6]` -> `[1, 2, 4, 4, 5, 6]`
    *   Compare 3 with 2. 3 > 2. Insert at index 2: `[1, 2, 3, 4, 5, 6]`

## Code

```cpp
void insertionSort(vector<int> &arr) {
  int n = arr.size();
  for (int i = 1; i < n; ++i) {
    int key = arr[i];
    int j = i - 1;
    // Shift elements greater than key to the right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    // Insert the key at the correct position
    arr[j + 1] = key;
  }
}
```

### Time and Space Complexity

*   **Worst-case Time Complexity:** $O(n^2)$. This occurs when the array is sorted in reverse order.  Each element must be compared with all preceding elements and shifted
*   **Average-case Time Complexity:** $O(n^2)$
*   **Best-case Time Complexity:** $O(n)$. This occurs when the array is already sorted. The inner loop never executes
*   **Space Complexity:** $O(1)$. Insertion Sort is an **in-place** algorithm

> [!Tip]
> Insertion sort can also be implemented using [[2 Zettels/stacks\|stacks]]. The idea is similar to insertion sort, where we take elements and find the right place to insert. Using stacks, we keep one stack to store the sorted result, while using another to hold intermediate values. Refer [[2 Zettels/sorting elements using stack\|sorting elements using stack]] for code and complexity.

## Related
- [[2 Zettels/bubble sort\|bubble sort]]