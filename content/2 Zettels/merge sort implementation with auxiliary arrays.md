---
{"publish":true,"created":"2025-01-06T11:53:19.249+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[merge sort\|merge sort]]
> - [[divide and conquer\|divide and conquer]]
> - [[recursion\|recursion]]

The merge sort algorithm follows a divide and conquer approach by recursively splitting the array into halves until single elements are obtained, then merging them back in sorted order. The key step is the merge operation which uses a two-pointer technique to efficiently combine two sorted arrays. This involves comparing elements from both arrays and placing the smaller one in the correct position, then advancing the corresponding pointer.

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    static void mergeSort(vector<int>& arr) {
        if (arr.size() > 1) {
            int mid = arr.size() / 2;
            vector<int> left(arr.begin(), arr.begin() + mid);
            vector<int> right(arr.begin() + mid, arr.end());

            mergeSort(left);
            mergeSort(right);

            int i = 0, j = 0, k = 0;

            // 2 pointers for merging sorted arrays
            while (i < left.size() && j < right.size()) {
                if (left[i] < right[j]) {
                    arr[k++] = left[i++];
                } else {
                    arr[k++] = right[j++];
                }
            }

            while (i < left.size()) {
                arr[k++] = left[i++];
            }

            while (j < right.size()) {
                arr[k++] = right[j++];
            }
        }
    }
};

int main() {
    vector<int> arr = {12, 11, 13, 5, 6, 7};
    Solution::mergeSort(arr);
    for (int value : arr) {
        cout << value << " ";
    }
    return 0;
}
```

T.C: $O(n\log(n))$
- The division process creates a binary tree of depth $\log(n)$)
- At each level of the tree, we process $n$ elements during merging

S.C: $O(n\log(n))$
- Recursion depth is $O(\log(n))$, but at each call, during merge step, we create 2 arrays `left` and `right`. Thus at each depth, we have $n$ auxiliary arrays.

Level 0 (root call):
```
vector<int> left(n/2 size)
vector<int> right(n/2 size) 

Total = n space
```

Level 1 (two calls):
```
For first half: 
    vector<int> left(n/4 size)
    vector<int> right(n/4 size) 
For second half: 
    vector<int> left(n/4 size) 
    vector<int> right(n/4 size) 
    
Total = n space
```

Level 2 (four calls): Similar pattern, still total $n$ space. 
And this continues until we reach single elements, with depth $\log(n)$.
## Related
- [[in-place merge sort implementation\|in-place merge sort implementation]]