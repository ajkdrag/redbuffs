---
{"publish":true,"created":"2025-03-22T21:08:11.437+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---

> [!Topics]
> - [[arrays\|arrays]]
> - [[sorting algorithms\|sorting algorithms]]
> - [[priority queues\|priority queues]]
> - [[quick sort\|quick sort]]

Given an array, find the k largest (or smallest) elements in the array. There are few different ways of solving this:

### 1. Sorting
The most intuitive approach is to sort the array in descending order and then select the first `k` elements.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

vector<int> kLargestUsingSort(vector<int> arr, int k) {
    sort(arr.begin(), arr.end(), greater<int>());
    vector<int> result(arr.begin(), arr.begin() + k);
    return result;
}

int main() {
    vector<int> arr = {1, 23, 12, 9, 30, 2, 50};
    int k = 3;
    vector<int> largest = kLargestUsingSort(arr, k);
    cout << "Top " << k << " elements: ";
    for (int num : largest) {
        cout << num << " ";
    }
    cout << endl;
    return 0;
}
```

**Time Complexity:** $O(n \log n)$ due to sorting + $O(k)$ for accessing results
**Space Complexity:** $O(1)$ if sorting is done in-place. Otherwise, it depends on the sorting algorithm.

> [!Note]
> If the range of numbers in the array is small, [[2 Zettels/counting sort\|counting sort]] can be used to sort the array in $O(n + k)$ time, where $n$ is the number of elements and $k$ is the range of the numbers. In such cases, if $k$ is sufficiently smaller than $n$, `counting sort` can provide better time complexity. However, the space complexity of `counting sort` is $O(k)$.

### 2. Min-Heap (Priority Queue)
First, we insert the initial `k` elements into the min-heap (`build_heap` -> $O(k)$). For each new element (total $n-k$ left), if it's larger than the heap's root (smallest of the `k` largest), replace the root and `heapify` -> $O(\log{k})$. After completing the entire traversal, the heap will contain exactly the `k` largest elements of the array.

```cpp
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

vector<int> kLargestUsingHeap(vector<int> arr, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int i = 0; i < k; ++i) {
        minHeap.push(arr[i]);
    }

    for (int i = k; i < int(arr.size()); ++i) {
        if (arr[i] > minHeap.top()) {
            minHeap.pop();
            minHeap.push(arr[i]);
        }
    }

    vector<int> result;
    while (!minHeap.empty()) {
        result.push_back(minHeap.top());
        minHeap.pop();
    }

    reverse(result.begin(), result.end()); // To get descending order

    return result;
}

int main() {
    vector<int> arr = {1, 23, 12, 9, 30, 2, 50};
    int k = 3;
    vector<int> largest = kLargestUsingHeap(arr, k);
    cout << "Top " << k << " elements: ";
    for (int num : largest) {
        cout << num << " ";
    }
    cout << endl;
    return 0;
}
```

**Time Complexity:** $O(k + (n-k)\log {k}) \approx O(n \log k)$ for creating the min-heap with our top-k elements. Addditionally, we incur $O(k \log k)$ for accessing them.
**Space Complexity:** $O(k)$

### 3. QuickSelect (Partitioning)
This approach uses the partitioning step of [[quick sort\|quick sort]] to find the kth largest element.

**Algorithm:**

1.  Use the `partition` function to place the pivot element at its correct sorted position
2.  If the index of the pivot is equal to `k-1`, then the first `k` elements to the left of the pivot (including the pivot) are the `k` largest elements
3.  If the index is less than `k-1`, recursively call `quickSelect` on the right partition
4.  If the index is greater than `k-1`, recursively call `quickSelect` on the left partition

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int partition(vector<int>& arr, int left, int right) {
    int pivot = arr[right];
    int i = left;
    for (int j = left; j < right; ++j) {
        if (arr[j] >= pivot) {
            swap(arr[i], arr[j]);
            i++;
        }
    }
    swap(arr[i], arr[right]);
    return i;
}

void quickSelect(vector<int>& arr, int left, int right, int k) {
    if (left <= right) {
        int pivotIndex = partition(arr, left, right);
        if (pivotIndex == k - 1) {
            return;
        } else if (pivotIndex < k - 1) {
            quickSelect(arr, pivotIndex + 1, right, k);
        } else {
            quickSelect(arr, left, pivotIndex - 1, k);
        }
    }
}

vector<int> kLargestUsingQuickSelect(vector<int>& arr, int k) {
    int n = arr.size();
    quickSelect(arr, 0, n - 1, k);
    vector<int> result(arr.begin(), arr.begin() + k);
    sort(result.begin(), result.end(), greater<int>());
    return result;
}

int main() {
    vector<int> arr = {1, 23, 12, 9, 30, 2, 50};
    int k = 3;
    vector<int> largest = kLargestUsingQuickSelect(arr, k);
    cout << "Top " << k << " elements: ";
    for (int num : largest) {
        cout << num << " ";
    }
    cout << endl;
    return 0;
}
```

**Time Complexity:**
* Worst Case: $O(n^2)$
* Average Case: $O(n)$
**Space Complexity:** $O(1)$ if done in-place.