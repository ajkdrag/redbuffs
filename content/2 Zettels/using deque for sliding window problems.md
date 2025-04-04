---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-01-25T22:11:38.440+05:30"}
---


> [!Topics]
> - [[2 Zettels/deques\|deques]]
> - [[sliding window\|sliding window]]

Sliding window algorithms are used to perform operations on contiguous subarrays (or subsequences) of a fixed size `k` within a larger array (or sequence) of size `n`. A naive approach often leads to $O(n \cdot{k})$ time complexity, where we iterate over each window. However, using double-ended queues ([[2 Zettels/deques\|deques]]), one can often reduce this to $O(n)$ by *efficiently maintaining information about the current window*.

> [!Tip]
> The key to efficient sliding window processing with deques lies in maintaining a **monotonic deque**. This means that the elements in the deque are either monotonically increasing or monotonically decreasing based on the problem.

### General Algorithm Structure (Snake Framework with Deque)

This integrates the deque maintenance logic within the [[2 Zettels/sliding window with fixed window size (snake framework)\|sliding window with fixed window size (snake framework)]].

1.  **Initialization:**
    *   Create an empty deque `dq` (often storing indices)
    *   Initialize `head = -1`, `tail = 0`
    *   Initialize `result` storage

2.  **Main Loop (Iterate through all possible start positions):**
    *   `while (tail < N):`

3.  **Expansion Phase (Snake Eating & Deque Update):** Expand `head` until the window `[tail, head+1]` reaches size `k`. While expanding:
    *   `while (head + 1 < N AND head - tail + 1 < k):`
        *   `head += 1`
        *   **Maintain Monotonic Deque:** Remove elements from the *back* of `dq` that violate the monotonic property with respect to `nums[head]`
        *   **Add Current Element:** Add `head` (the index) to the *back* of `dq`

4.  **Process Window & Update Answer:** Once the window potentially reaches size `k`:
    *   `if (head - tail + 1 == k):`
        *   The answer for the window `[tail, head]` is typically derived from the *front* of the deque (e.g., `nums[dq.front()]` for max/min)
        *   Add the result for the current window

5.  **Contraction Phase (Tail Moving & Deque Update):** Shrink the window by moving `tail` and removing its effect from the deque
    *   `if (tail <= head):`
        *   **Remove Out-of-Window Elements:** If the index at the *front* of `dq` is equal to `tail`, remove it (`dq.pop_front()`) as it's sliding out of the window
    *   `tail += 1`
    *   `head = max(head, tail - 1)`

6.  Return `result`

> [!Note]
> - The deque `dq` always contains indices `i` such that `tail <= i <= head`
> - The expansion phase ensures new elements are added and the monotonic property is maintained from the back
> - The contraction phase ensures elements sliding out of the window are removed from the front
> - The element at `dq.front()` usually holds the index relevant to the window's property (e.g., index of the maximum element)

> [!Example]
> **Problem:** [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/description/)
> Find the maximum element in each subarray of size `k`. We use the snake framework and maintain a monotonically *decreasing* deque of indices.
>
> - **Expansion:** When adding `nums[head]`, remove indices `j` from the back of `dq` where `nums[j] <= nums[head]`, then add `head`.
> - **Process:** When the window `[tail, head]` has size `k`, the maximum is `nums[dq.front()]`. Add this to the result.
> - **Contraction:** When moving `tail`, if `dq.front() == tail`, pop it from the front.

```cpp
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    int n = nums.size();
    if (n == 0) return {};
    
    deque<int> dq;  // Stores indices of elements in decreasing order of their values
    vector<int> result;
    int head = -1, tail = 0;  // Empty window initially
    
    while (tail < n) {
        // Expansion phase: Grow window towards size k
        // Only expand if the next element is within bounds AND current window size < k
        while (head + 1 < n && (head - tail + 1) < k) {
            head++;
            // Maintain deque's decreasing property (remove smaller elements from back)
            while (!dq.empty() && nums[dq.back()] <= nums[head]) {
                dq.pop_back();
            }
            // Add the current index
            dq.push_back(head);
        }
        
        // Process window if it's exactly size k
        if (head - tail + 1 == k) {
            // The front of the deque has the index of the max element in [tail, head]
            result.push_back(nums[dq.front()]);
        }
        
        // Contraction phase: Move tail forward
        if (tail <= head) { // Ensure we are removing a valid element
             // If the element sliding out (nums[tail]) is the max (at dq.front()), remove it
            if (!dq.empty() && dq.front() == tail) {
                dq.pop_front();
            }
        }
        // Advance tail for the next window
        tail++;
        // Ensure head doesn't fall behind tail (maintains window logic)
        head = max(head, tail - 1); 
    }
    return result;
}
```

## Related
- [[2 Zettels/sliding window with variable window size (snake framework)\|sliding window with variable window size (snake framework)]]
