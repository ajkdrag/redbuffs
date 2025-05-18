---
{"publish":true,"created":"2025-01-28T13:47:49.919+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[2 Zettels/two pointers technique\|two pointers technique]]
> - [[2 Zettels/prefix sums\|prefix sums]]

The 2-pointer + prefix sums array technique is another powerful strategy, especially for problems involving subarrays or subsequences in arrays. Useful when the array is non-negative (i.e prefix array is monotonic or sorted) and you need to find a subarray with specific properties (e.g. sum <= `k`).
### Classic Problem: Number of Subarrays with Sum at most K
You have an array of non-negative integers A of length n. Find the number of subarrays whose sum is at most k.
```
Input: arr = [1, 2, 1, 2], k = 3
Output: 7
Explanation: The subarrays are:
- [1]
- [1, 2]
- [2]
- [2, 1]
- [1]
- [1, 2]
- [2]
```

1. **Prefix Sum Array:**
    Calculate the prefix sum array P of the input array A.
2. **2-Pointers:**
    - Initialize a `left` pointer at the beginning and a `right` pointer at the end of the prefix sum array.
    - Iterate `right` through the array.
    - For each `right`, move `left` forward as long as the subarray sum `P[right] - P[left]` exceeds the target value `k`.
    - The number of valid subarrays ending at `right` is `right - left`.
        
```cpp
int countSubarraysWithSumAtMostK(const vector<int>& A, int K) {
    int n = A.size();
    // 1) Compute prefix sums
    vector<long long> P(n+1, 0);
    for(int i = 0; i < n; i++) {
        P[i+1] = P[i] + A[i];
    }
    // A: [1, 2, 1, 2]
    // P: [0, 1, 3, 4, 6]
    
    // 2) Two pointers
    int left = 0;
    long long count = 0;
    
    // right goes from 1 to n (index in prefix sums)
    for(int right = 1; right <= n; right++) {
            // Move left pointer while sum of subarray [left..(right-1)] > K
        // subarray sum is P[right] - P[left]
        while(P[right] - P[left] > K) {
            left++;
        }
        
        // Now, all subarrays that end at right-1 (in original array)
        // and start at any index in [left, right-1] have sum <= K.
        // Number of such subarrays = right - left
        count += (right - left);
    }
    
    return count;
}
```

**Adaptations:**
- **Exact Sum = k:** Use simple [[2 Zettels/sliding window with variable window size\|sliding window with variable window size]]. Alternatively, count subarrays with sum <= k and subtract those with sum <= (k-1).
- **Sum >= k:** Total number of subarrays - count of subarrays with sum <= (k-1)
- **Negative Numbers:** More complex; since P is no longer guaranteed to be monotonic, so a simple two-pointer approach on the prefix array doesn't work directly. Use different strategies (hashing prefix sums or [[segment trees\|segment trees]])
## Related
