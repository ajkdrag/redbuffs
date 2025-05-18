---
{"publish":true,"created":"2025-03-20T10:31:50.220+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[sorting algorithms\|sorting algorithms]]
> - [[2 Zettels/stable sorting algorithm\|stable sorting algorithm]]

Bubble Sort is a simple, **comparison-based** sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted. 

> The algorithm gets its name because smaller (or larger, depending on the sorting order) elements "bubble" to the top of the list.

## Algorithm and Dry Run

The algorithm works as follows:

1. **Outer Loop:** Iterate from the beginning of the array to the second-to-last element.  Each iteration/pass of the outer loop places the largest (or smallest) unsorted element in its correct final position
2. **Inner Loop:** Iterate from the beginning of the array up to the `n - i - 1`th element (where `n` is the array length and `i` is the current iteration of the outer loop).  This is because the last `i` elements are already sorted after `i` passes
3. **Comparison and Swap:**  Compare each element with its adjacent element. If they are in the wrong order (e.g., the left element is greater than the right element in ascending order sorting), swap them
4. **Termination:**  If no swaps occurred in a pass, array is now sorted -> terminate

> [!NOTE]
> Bubble sort is a [[2 Zettels/stable sorting algorithm\|stable sorting algorithm]]. Adjacent elements are swapped only if they are _strictly_ out of order (e.g., `a > b`), not if they are equal (`a >= b`), thus preserving the relative order of equal elements.

### Dry Run
Let's sort the array `[5, 2, 4, 2, 8]` in ascending order:

*   **Pass 1:**
    * `[**5, 2**, 4, 2, 8]` -> `[**2, 5**, 4, 2, 8]` (swap 5 and 2)
    * `[2, **5, 4**, 2, 8]` -> `[2, **4, 5**, 2, 8]` (swap 5 and 4)
    * `[2, 4, **5, 2**, 8]` -> `[2, 4, **2, 5**, 8]` (swap 5 and 2)
    * `[2, 4, 2, **5, 8**]` -> `[2, 4, 2, 5, 8]` (no swap)
    * Largest element (8) is now in its correct position

*   **Pass 2:**
    * `[**2, 4**, 2, 5, 8]` -> `[2, 4, 2, 5, 8]` (no swap)
    * `[2, **4, 2**, 5, 8]` -> `[2, **2, 4**, 5, 8]` (swap 4 and 2)
    * `[2, 2, **4, 5**, 8]` -> `[2, 2, 4, 5, 8]` (no swap)
    * Second largest element (5) is now in its correct position

*   **Pass 3:**
    * `[**2, 2**, 4, 5, 8]` -> `[2, 2, 4, 5, 8]` (**no swap** -> stable)
    * `[2, **2, 4**, 5, 8]` -> `[2, 2, 4, 5, 8]` (no swap)
    * Since there was no swapping in this pass, the array is *sorted*

## Code

```cpp
void bubbleSort(vector<int> &arr) {
  int n = arr.size();
  bool swapped;
  for (int i = 0; i < n - 1; ++i) {
    swapped = false;
    for (int j = 0; j < n - i - 1; ++j) {
      if (arr[j] > arr[j + 1]) {
        swap(arr[j], arr[j + 1]);
        swapped = true;
      }
    }
    // If no swaps in inner loop, the array is sorted
    if (!swapped) {
      break;
    }
  }
}
```

### Time and Space Complexity

* **Worst-case Time Complexity:**  $O(n^2)$.  This occurs when the array is sorted in reverse order.  Each element must be compared and potentially swapped with every other element
* **Average-case Time Complexity:** $O(n^2)$
* **Best-case Time Complexity:** $O(n)$. This occurs when the array is already sorted, since we terminate after the first pass (no swaps)
* **Space Complexity:** $O(1)$. Bubble Sort is an **in-place** algorithm

> [!Warning]
> Bubble Sort is generally inefficient for large datasets due to its quadratic time complexity. It's primarily used for educational purposes or for very small datasets where simplicity is more important than performance.  Other algorithms like [[merge sort\|merge sort]] or [[quick sort\|quick sort]] are much more efficient for larger datasets.

## Related
- [[2 Zettels/insertion sort\|insertion sort]]