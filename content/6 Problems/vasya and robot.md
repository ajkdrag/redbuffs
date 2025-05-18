---
{"publish":true,"created":"2025-04-08T08:06:52.625+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[2 Zettels/sliding window with fixed window size\|sliding window with fixed window size]]

To move the robot from (0,0) to (x,y), Vasya wants to change the sequence of operations so that the length of the changed subsegment is minimized. The length of the changed subsegment is calculated as maxID−minID+1, where maxID and minID are the maximum and minimum indices of the changed operations. The goal is to find the minimum possible length of the changed subsegment, or determine that it's impossible.

## Idea

The problem can be approached using binary search on the answer (minimum window size) combined with a sliding window check. The key observation is that the answer has a monotonic property: if a window of size `k` works, any larger window will also work, allowing binary search.

For a given window size `k`, we use the sliding window framework to check if there exists any subarray of length `k` that can be modified to reach the target. The modification check involves calculating the required changes in x and y movements within the window. The total changes must satisfy two conditions:

- their sum must be ≤ `k` (window size)
- the parity must match (since each change affects the sum by ±2)

For each window `[l ,..., r]`, we can use [[2 Zettels/prefix sums\|prefix sums]] to find position after going through the sequence `[0 ,..., l-1`] (i.e. before window). Also, we need to perform the remaining of the sequence `[r+1 ,..., n]` (found using prefix sums as well). The required number of changes needed to reach target can then be found simply by doing: `target - interim` where `interim` is the position reached after we did all the moves before and after the window (skipping the window itself).

**Time Complexity:** $O(n \log n)$
**Space Complexity:** $O(n)$

An alternative implementation is to compute `interim` on the fly during the sliding window's expansion and contraction processes. The [[2 Zettels/sliding window with fixed window size (snake framework)\|sliding window with fixed window size (snake framework)]] can be used as an implementation template to follow. This is more space-efficient $O(1)$, as it avoids storing prefix arrays.

## Code

```cpp
// Approach 1 (Binary Search + 2 pointers + prefix sums)
bool canReachDestination(int window_size, const vi &prefix_x,
                         const vi &prefix_y, int target_x, int target_y) {
  int n = prefix_x.size() - 1; // Adjust for 1-indexed prefix arrays

  // Slide a window of fixed size 'window_size' through the path
  for (int left = 1; left <= n - window_size + 1; ++left) {
    int right = left + window_size - 1;

    // Position before window
    int curr_x = prefix_x[left - 1];
    int curr_y = prefix_y[left - 1];

    // Remaining moves after window
    int remaining_x_moves = prefix_x[n] - prefix_x[right];
    int remaining_y_moves = prefix_y[n] - prefix_y[right];

    // position reached by doing all moves except the window
    int interim_x = (curr_x + remaining_x_moves);
    int interim_y = (curr_y + remaining_y_moves);

    // Required changes within window to reach target
    int needed_x = target_x - interim_x;
    int needed_y = target_y - interim_y;

    // Check if window can be modified to reach target
    int total_changes_needed = abs(needed_x) + abs(needed_y);
    if (total_changes_needed <= window_size &&
        total_changes_needed % 2 == window_size % 2) {
      return true;
    }
  }

  return false;
}

void solve() {
  int n;
  cin >> n;
  string path;
  cin >> path;

  int target_x, target_y;
  cin >> target_x >> target_y;

  // Early exit: if Manhattan distance > n, impossible
  if (abs(target_x) + abs(target_y) > n ||
      (abs(target_x) + abs(target_y)) % 2 != n % 2) {
    cout << -1 << endl;
    return;
  }

  // Calculate prefix sums for x and y coordinates
  vi prefix_x(n + 1, 0), prefix_y(n + 1, 0);
  for (int i = 0; i < n; ++i) {
    prefix_x[i + 1] = prefix_x[i];
    prefix_y[i + 1] = prefix_y[i];

    if (path[i] == 'R')
      prefix_x[i + 1]++;
    else if (path[i] == 'L')
      prefix_x[i + 1]--;
    else if (path[i] == 'U')
      prefix_y[i + 1]++;
    else if (path[i] == 'D')
      prefix_y[i + 1]--;
  }

  // Early check
  if (prefix_x[n] == target_x && prefix_y[n] == target_y) {
    cout << 0 << endl;
    return;
  }

  // Binary search for minimum window size
  int lo = 1, hi = n;
  int min_window_size = -1;

  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (canReachDestination(mid, prefix_x, prefix_y, target_x, target_y)) {
      min_window_size = mid;
      hi = mid - 1; // Try to find smaller window
    } else {
      lo = mid + 1; // Try larger window
    }
  }

  cout << min_window_size << endl;
}
```

Alternative implementation that doesn't use extra space and aligns with the [[2 Zettels/sliding window with fixed window size (snake framework)\|sliding window with fixed window size (snake framework)]]:

```cpp
bool canReachDestination(int window_size, const string &path, int target_x,
                         int target_y) {
  int n = path.size();

  // Snake framework for fixed window size
  int tail = 0, head = -1;

  // Track positions before and after the window
  int curr_x = 0, curr_y = 0;           // Position before window
  int remaining_x = 0, remaining_y = 0; // Remaining moves after window

  // Calculate initial remaining moves (all moves)
  // Note that this can be pre-computed once and passed to this func
  for (char c : path) {
    if (c == 'R')
      remaining_x++;
    else if (c == 'L')
      remaining_x--;
    else if (c == 'U')
      remaining_y++;
    else if (c == 'D')
      remaining_y--;
  }

  while (tail < n) {
    // Expansion phase: Expand until window_size or end of array
    while (head + 1 < n && head - tail + 1 < window_size) {
      head++;
      // Update remaining moves (subtract moves in window)
      if (path[head] == 'R')
        remaining_x--;
      else if (path[head] == 'L')
        remaining_x++;
      else if (path[head] == 'U')
        remaining_y--;
      else if (path[head] == 'D')
        remaining_y++;
    }

    // Process window
    if (head - tail + 1 == window_size) {
      int interim_x = curr_x + remaining_x;
      int interim_y = curr_y + remaining_y;

      // Required changes within window to reach target
      int needed_x = target_x - interim_x;
      int needed_y = target_y - interim_y;

      // Check if window can be modified to reach target
      int total_changes_needed = abs(needed_x) + abs(needed_y);
      if (total_changes_needed <= window_size &&
          total_changes_needed % 2 == window_size % 2) {
        return true;
      }
    }

    // Contraction phase: Remove element at tail
    if (tail <= head) {
      // Update current position
      if (path[tail] == 'R') {
        curr_x++;
      } else if (path[tail] == 'L') {
        curr_x--;
      } else if (path[tail] == 'U') {
        curr_y++;
      } else if (path[tail] == 'D') {
        curr_y--;
      }
    }

    // Advance tail
    tail++;
    head = max(head, tail - 1);
  }

  return false;
}

```

## Related
