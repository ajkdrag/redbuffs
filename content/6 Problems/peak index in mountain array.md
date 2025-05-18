---
{"publish":true,"created":"2025-03-02T11:19:12.973+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[binary search\|binary search]]

## Idea

Straightforward application of the [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]]. First to keep things simple, imagine we have neg inf on both ends of the array. The array can be conceptually converted to boolean array by the transformation: `arr[i] > arr[i+1]`. Goal is then to find the first 1 . Alternatively, do `arr[i] < arr[i-1]`. Goal is then to find the [[2 Zettels/binary search boolean array framework#Variations\|last 0]] in the transformed array.

**Time Complexity:** $O(\log n)$

## Code

```cpp
class Solution {
public:
    Solution() {}
    // arr[i] > arr[i+1]
    bool check(vector<int>& arr, int mid) {
        // 2, 4, 6, 1, 0, -inf
        // 0, 0, 1, 1, 1 <- bool arr
        // 3, 2, 1, -inf
        // 1, 1, 1 <- bool arr
        // 1, 2, 3, -inf
        // 0, 0, 1 <- bool arr
        return ((mid == arr.size() - 1) or arr[mid] > arr[mid + 1]);
    }

    // alternative: arr[i] < arr[i-1]
    bool check2(vector<int>& arr, int mid) {
        // Imagine the arr to be surrounded with -inf on both sides
        // -inf, 2, 4, 6, 1, 0, -inf
        //    0, 0, 0, 0, 1, 1, 1
        // -inf, 3, 2, 1, -inf
        //    0, 0, 1, 1, 1
        // -inf, 1, 2, 3, -inf
        //    0, 0, 0, 0, 1
        if (mid == 0)
            return false;
        mid--;
        if (mid == arr.size())
            return true;
        return arr[mid] < (mid > 0 ? arr[mid - 1] : INT_MIN);
    }

    int peakIndexInMountainArray(vector<int>& arr) {
        int n = arr.size();
        int lo = 0, hi = n - 1;
        int ans = hi;

        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (check(arr, mid)) {
                ans = mid;
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
        return ans;
    }

    int peakIndexInMountainArrayV2(vector<int>& arr) {
        int n = arr.size();
        int lo = 0, hi = n + 1;
        int ans;

        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (check2(arr, mid)) {
                hi = mid - 1;
            } else {
                ans = mid;
                lo = mid + 1;
            }
        }
        return ans - 1;
    }
};
```

## Related

- [[6 Problems/min element in a rotated sorted array\|min element in a rotated sorted array]]
