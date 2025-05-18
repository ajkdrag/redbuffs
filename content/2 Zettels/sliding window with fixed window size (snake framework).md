---
{"publish":true,"created":"2025-04-03T10:14:28.787+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[sliding window\|sliding window]]

This note adapts the [[2 Zettels/sliding window with variable window size (snake framework)\|sliding window with variable window size (snake framework)]] for problems requiring a window of a **fixed size** `k`. The core idea remains the same: expand the window (`head`) as much as possible, process the window, then contract it (`tail`). The key difference is in the expansion condition and when the answer is updated.

### The Snake Pattern - Fixed Size Algorithm

- **Initialization:**
    - `tail = 0, head = -1`: Represents an empty window
    - Initialize `answer` (e.g., `max_value = -infinity`, `min_value = +infinity`, `max_count = 0`)
    - Initialize `state` variables needed to track the window's properties (e.g., `currentSum`, `frequencyMap`, `distinctCount`)

- **Main Loop (Iterate through all possible start positions):**
    - `while (tail < N):`

- **Expansion Phase (Snake Eating):** Expand the `head` until the window `[tail, head+1]` reaches the desired size `k`

  ```cpp
  // While there's a next element AND window size is less than k
  while (head + 1 < N AND head - tail + 1 < k):
      head += 1
      update_state(state, nums[head]) // Update state with the newly added element
  ```

- **Process Window & Update Answer:** Once the window potentially reaches size `k`, check and update the answer

  ```cpp
  // Check if the window has exactly size k
  if (head - tail + 1 == k):
      // Calculate or retrieve the answer from the 'state' for the current window [tail, head]
      current_window_property = calculate_property(state) 
      answer = update_answer(answer, current_window_property) 
  ```

- **Contraction Phase (Tail Moving):** Shrink the window from the left by moving `tail` one step to the right. Prepare the `state` for the next iteration by removing the effect of `nums[tail]`

    ```cpp
    // Update state to reflect removal of nums[tail]
    if (tail <= head): // Only remove if it was actually part of a valid window
         undo_update_state(state, nums[tail])

    // Advance the tail
    tail += 1
    // Ensure snake size isn't negative
    head = max(head, tail - 1) 
    ```

- Return `answer` after the `while (tail < N)` loop finishes

### Example: AtCoder - Colorful Candies

**Problem:** Given an array `c` of N candy colors and an integer K, find the maximum number of distinct colors in any contiguous subarray of size K. ([Problem Link](https://atcoder.jp/contests/abc210/tasks/abc210_c))

**Idea:** Apply the fixed-size sliding window snake framework.

- **State:**
    - `freq`: A map or frequency array to store counts of each color in the current window `[tail, head]`
    - `distinctCount`: The number of distinct colors currently in the window
- **`update_state(state, added_element)`:**
    - Increment `freq[added_element]`
    - If `freq[added_element]` becomes 1, increment `distinctCount`
- **`undo_update_state(state, removed_element)`:**
    - Decrement `freq[removed_element]`
    - If `freq[removed_element]` becomes 0, decrement `distinctCount`
- **Answer:** `maxDistinctCount`, updated via `max(maxDistinctCount, distinctCount)` only when the window size `head - tail + 1` equals `k`.

```cpp
map<int, int> freq; // Use map for potentially large color IDs

// Updates state when arr[head] is added to the window
void update_state(int &count, int val) {
  if (freq[val] == 0) // If this color wasn't in the window before
    count++;          // Increment distinct count
  freq[val]++;        // Increment frequency of this color
}

// Updates state when arr[tail] is removed from the window
void undo_update_state(int &count, int val) {
  freq[val]--;        // Decrement frequency of this color
  if (freq[val] == 0) // If this was the last candy of this color
    count--;          // Decrement distinct count
}

void solve() {
  int n, k;
  cin >> n >> k;
  vector<int> arr(n);
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
  }

  int head = -1, tail = 0; // 0-length snake/window
  int count = 0; // State: current number of distinct colors
  int ans = 0;   // Answer: maximum distinct colors found

  // Usually, we clear map for each test case
  // freq.clear(); // See Tip below

  while (tail < n) {
    // Expansion Phase: Expand until window size is k or end of array
    while (head + 1 < n && head - tail + 1 < k) {
      head++;
      update_state(count, arr[head]);
    }

    // Process Window & Update Answer: If window is valid (i.e. size k)
    if (head - tail + 1 == k) {
      ans = max(ans, count);
    }

    // Contraction Phase: Remove element at tail
    if (tail <= head) { // Ensure tail isn't past head
      undo_update_state(count, arr[tail]);
    }

    // Advance tail
    tail++;
    // Ensure head doesn't fall behind tail
    head = max(head, tail - 1); 
  }
  cout << ans << '\n';
}
```

> [!tip] State Resetting in Snake Framework
> Notice how for each element `arr[i]`, it's eventually added by `update_state` when `head` reaches `i`, and later removed by `undo_update_state` when `tail` reaches `i`. This means the `state` (like the `freq` map and `count` above) effectively gets "reset" over the course of the iteration.
> 
> For problems with multiple test cases run sequentially, this structure has an advantage: you often **don't need to explicitly clear the state variables** (like `freq.clear()`) between test cases, because the `undo_update_state` calls naturally return the state components to their initial values (e.g., counts back to 0). 

## Related
- [[2 Zettels/sliding window with variable window size (snake framework)\|sliding window with variable window size (snake framework)]]
- [[2 Zettels/using deque for sliding window problems\|using deque for sliding window problems]] (Alternative for some fixed-size problems like max/min)