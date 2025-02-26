---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-01-25T22:11:38.440+05:30"}
---


> [!Topics]
> - [[2 Zettels/deques\|deques]]
> - [[sliding window\|sliding window]]

Sliding window algorithms are used to perform operations on contiguous subarrays (or subsequences) of a fixed size `k` within a larger array (or sequence) of size `n`. A naive approach often leads to $O(n \cdot{k})$ time complexity, where we iterate over each window. However, using double-ended queues ([[2 Zettels/deques\|deques]]), one can often reduce this to $O(n)$ by *efficiently maintaining information about the current window*.

> [!Tip]
> The key to efficient sliding window processing with deques lies in maintaining a **monotonic deque**. This means that the elements in the deque are either monotonically increasing or monotonically decreasing based on the problem.

### General Algorithm Structure
1. **Initialization:** Create an empty deque `dq`
2. **Process the first _k_ elements:** Add elements to the deque while maintaining the monotonic property. Often we add index of element instead of element itself.
3. **Process the remaining elements (from _k_ to _n_-1):**
    1. Remove elements from the front of `dq` that are no longer within the current window (i.e., their indices are less than `i - k + 1`)
    2. Remove elements from the back of `dq` to *maintain the monotonic property*.
    3. Add the current element to the back of `dq`
    4. Perform the desired operation using the elements in `dq`.
4. **Process the last window (if necessary):** Sometimes a final operation needs to be performed after the main loop.

> [!Note]
> At any given point in time, the deque has the following properties:
> - It only contains elements whose indices are within the current window. This is ensured by popping elements from the front of the queue whose indices are outside of window
> - It contains elements with their indices in strictly increasing order, since new elements with higher indices are always pushed to the back of the deque
> - Before pushing an element, we "manipulate" the deque, e.g. pop from the rear, in order to maintain the monotonic property
> - Performing the desired operation can be done at the end of the iteration or in between, depending on the problem and the window range

> [!Example] 
> **Problem:** [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/description/)
> A nice example will be finding the maximum element in each subarray of size `k`. Maintain a monotonically *decreasing* deque of indices based on the *values* in the array. `arr[dq[i]]` > `arr[dq[j]]` if `i < j`. Thus, The front of the deque (`dq.front()`) always contains the index of the maximum element in the current window.

```cpp
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    int n = nums.size();
    if(n == 0) return {};
    vector<int> result;
    deque<int> dq;
    
    for (int i = 0; i < n; ++i) {
        // Remove indices that are out of the current window [i-k+1, i]
        if (!dq.empty() && dq.front() < i - k + 1) {
            dq.pop_front();
        }
        
        // Remove indices whose corresponding values are less than nums[i]
        while (!dq.empty() && nums[i] >= nums[dq.back()]) {
            dq.pop_back();
        }
        
        // Add current index
        dq.push_back(i);
        
        // Once the first window is complete, record the maximum element for each window
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    return result;
}
```

## Related
