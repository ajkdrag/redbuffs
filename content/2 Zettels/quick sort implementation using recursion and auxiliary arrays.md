---
{"publish":true,"created":"2025-01-06T11:44:16.465+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[quick sort\|quick sort]]
> - [[sorting algorithms\|sorting algorithms]]

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    static vector<int> quickSort(vector<int>& arr) {
        if (arr.size() <= 1) {
            return arr;
        }
        int pivot = arr[arr.size() / 2];
        vector<int> left, middle, right;
        for (int x : arr) {
            if (x < pivot) left.push_back(x);
            else if (x > pivot) right.push_back(x);
            else middle.push_back(x);
        }
        left = quickSort(left);
        right = quickSort(right);
        left.insert(left.end(), middle.begin(), middle.end());
        left.insert(left.end(), right.begin(), right.end());
        return left;
    }
};

int main() {
    vector<int> arr = {3, 6, 8, 10, 1, 2, 1};
    vector<int> sortedArr = Solution::quickSort(arr);
    for (int x : sortedArr) {
        cout << x << " ";
    }
    return 0;
}
```

This implementation of quick sort has a time complexity of $O(n\log(n))$, on average. In the worst case, the time complexity is $O(n^2)$, if the pivot is always the smallest or largest element in the array.

The space complexity for this implementation is $O(n^2)$ in worst case. This is because the call stack grows with the number of recursive calls. In worst case, the number of recursive calls is linear, and we create auxiliary arrays at each recursive call as well that **STAY in memory until all child recursive calls complete**.

## Related
