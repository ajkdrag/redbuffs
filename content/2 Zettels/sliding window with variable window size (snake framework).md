---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-02T14:09:38.095+05:30"}
---


> [!Topics]
> - [[sliding window\|sliding window]]

In a typical sliding window setup, we maintains a window of a constant size `k`. As window slides, one element enters from the `right`, and one element leaves from the `left` in each step. **Example**: Finding the max sum of all subarrays of size `k`.

Several problems require the window size to dynamically expand and contract. The right pointer (`head`) tries to expand the window as much as possible while maintaining a condition. The left pointer (`tail`) moves forward only when necessary (usually when the condition is violated or to explore new starting positions). It's particularly useful for solving problems that ask for the "longest", "shortest", or "count of" subarrays/substrings satisfying a specific condition.

### Applicability Condition

If a window `[L, R]` (representing the subarray from index L to R, inclusive) satisfies a given property P (i.e., is "valid"), then any valid sub-window, e.g. the window `[L+1, R]`, must **also** satisfy property P. 

> Shrinking the window from the left cannot make a valid window invalid.

> [!Question] Why is this important?
> If `[L, R]` is valid, when we consider starting the window at L+1, we know `[L+1, R]` is already valid. We don't need to shrink R. Our goal then becomes to see if we can expand R further to find the largest possible valid window starting at L+1. Conversely, if `[L, R]` becomes invalid as R expands, we must shrink the window by incrementing L to try and restore validity.

### The Snake Pattern - General Algorithm

- **Initialization:**
    - `tail = 0, head = -1`: Represents a snake of length `head - tail + 1 = 0`.
    - Initialize `answer` (e.g., `maxLength = 0`, `count = 0`).
    - Initialize `state` variables needed to track the window's property (e.g., `currentSum`, `frequencyMap`, `zeroCount`).

- **Main Loop (Iterate through all possible start positions):**
    - `while (tail < N):`

- **Expansion Phase (Snake Eating):** Expand the `head` as far right as possible while the window `[tail, head+1]` remains valid:

  ```cpp
  // While there's a next element AND adding it maintains the property
  while (head + 1 < N AND check_condition(state, nums[head + 1])):
      head += 1
      update_state(state, nums[head])
  ```

    - `check_condition`: Function determining if adding `nums[head + 1]` keeps the window valid.
    - `update_state`: Function to update the `state` after adding `nums[head + 1]`.

- **Process Answer:** The window `[tail, head]` is now the largest valid window starting at the current `tail`. Update the overall answer based on this window, but check first if window is valid, i.e. `if (head - tail + 1 != 0)`

    ```cpp
    // Example: Find maximum length
    currentLength = head - tail + 1
    answer = max(answer, currentLength)

    // Example: Count valid subarrays
    // If [tail, head] is valid, all subarrays [tail, i] where tail <= i <= head are valid.
    answer += (head - tail + 1)
    ```

- **Contraction Phase (Tail Moving):** Shrink the window from the left by moving `tail` one step to the right. Prepare the `state` for the next iteration.

    ```cpp
    // Update state to reflect removal of nums[tail]
    if (tail <= head): // Only remove if it was actually in the valid window segment
         undo_update_state(state, nums[tail])

    // advance the tail
    tail += 1
    // make sure snake size isn't -ve at any step
    head = max(head, tail - 1)
    ```

- Return `answer` after the `while (tail < N)` loop finishes.

> [!Tip]
> This algo can be [[2 Zettels/sliding window with fixed window size (snake framework)\|modified]] to work with fixed-size sliding window problems as well.
### Example: Maximum Length Subarray with At Most K Zeros

This problem (alternative wording: [[6 Problems/consecutive one\|consecutive one]]) can be solved in $O(n)$ using the sliding window snake framework:

- **Property P:** The number of zeros in the window `[tail, head]` is less than or equal to `k`
- **State:** `currentZeros`: The count of zeros in the current window
- **check_condition(state, next_element):** Is `(next_element == 1) OR (currentZeros < k)`?
- **update_state(state, added_element):** If `added_element == 0`, increment `currentZeros`
- **undo_update_state(state, removed_element):** If `removed_element == 0`, decrement `currentZeros`
- **Answer:** `maxLength`, updated via `max(maxLength, head - tail + 1)`

```cpp
bool check_condition(int &zeros, int value, int k) {
  if (value == 1)
    return true;
  return zeros + 1 <= k;
}

void update_state(int &zeros, int value) {
  if (value == 0)
    zeros++;
}

void undo_update_state(int &zeros, int value) {
  if (value == 0)
    zeros--;
}

void solve() {
  int n, k;
  cin >> n >> k;
  vector<int> arr(n);

  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
  }

  int state = 0;
  int answer = 0;

  int tail = 0, head = -1;
  while (tail < n) {
    // While there's a next element AND adding it maintains the property
    while (head + 1 < n and check_condition(state, arr[head + 1], k)) {
      head += 1;
      update_state(state, arr[head]);
    }

    if (head - tail + 1 != 0)
        answer = max(answer, head - tail + 1);
        
    if (tail <= head) {
      undo_update_state(state, arr[tail]);
    }

    // advance the tail
    tail += 1;
    // make sure snake size isn't -ve at any step
    head = max(head, tail - 1);
  }

  cout << answer << "\n";
}
```

## Related
