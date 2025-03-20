---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-03-20T10:04:44.631+05:30"}
---


> [!Topics]
> - [[sorting algorithms\|sorting algorithms]]

A **stable sorting algorithm** is a sorting algorithm that preserves the relative order of elements with equal keys.  In other words, if two elements have the same value (according to the sorting criterion), their order in the sorted output will be the same as their order in the original input.

> [!Example]
> Consider sorting the array `[2a, 2b, 1]` using an unstable sorting algorithm. Here, `2a` and `2b` represent two elements with the same value (2), but with different identifiers (a and b) to track their original order.
> 
> - **Initial array:** `[2a, 2b, 1]`
> - **Possible sorted array (unstable):** `[1, 2b, 2a]`
> 
> Notice that `2b` now comes before `2a`, even though `2a` appeared before `2b` in the original array. A stable sorting algorithm would have produced `[1, 2a, 2b]`.

### Why is Stability Important?

Stability is crucial especially when **Sorting on Multiple Attributes:**  Imagine sorting a list of people first by last name and then by first name.  A stable sort ensures that after sorting by first name, people with the same first name will remain sorted by their last names (the order established in the previous sort).  An unstable sort might jumble the order of people with the same first name, losing the previous sorting by last name

### Stable vs. Unstable Sorting Algorithms

**Stable Sorting Algorithms:**

* [[2 Zettels/counting sort\|counting sort]]: As explained in [[2 Zettels/counting sort is stable\|counting sort is stable]], its stability comes from processing the input array in *reverse* order when building the output array
* [[merge sort\|merge sort]]: Merge sort is inherently stable.  During the merge step, if elements from the left and right subarrays are equal, the element from the *left subarray* is always taken first, preserving the original order
* [[2 Zettels/insertion sort\|insertion sort]]: Insertion sort is also stable. When inserting an element, it's placed *after* any existing elements with the same value
* [[2 Zettels/bubble sort\|bubble sort]]: Bubble sort, when implemented correctly, is stable.  Adjacent elements are swapped only if they are *strictly* out of order (e.g., `a > b`), not if they are equal (`a >= b`)
* [[radix sort\|radix sort]]: Radix sort's stability depends on the stability of the digit-sorting algorithm it uses (often counting sort). If the underlying digit sort is stable, radix sort is also stable
* [[tim sort\|tim sort]]: Hybrid of merge and insertion

**Unstable Sorting Algorithms:**

* [[quick sort\|quick sort]]: Quick sort is generally *not* stable.  The partitioning step can change the relative order of equal elements. While stable versions of quicksort exist, they typically require additional space or complexity
* [[heap sort\|heap sort]]: Heap sort is unstable. The heap operations: `heapify, insert, delete` do not guarantee the preservation of the original order of equal elements
* [[2 Zettels/selection sort\|selection sort]]: Selection sort is unstable. The swapping of the minimum element with the current element can disrupt the order of equal elements
* [[shell sort\|shell sort]]: Shell sort is an extension of insertion sort, but it is generally unstable due to the larger gaps used in the initial passes

## Related