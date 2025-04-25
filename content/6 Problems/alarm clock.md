---
{"publish":true,"tags":["type/problem"],"platform":"Codeforces","link":"https://codeforces.com/contest/898/problem/D","PassFrontmatter":true,"created":"2025-04-03T16:28:51.967+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/sliding window with fixed window size\|sliding window with fixed window size]]
> - [[2 Zettels/greedy algorithm\|greedy algorithm]]

Find the minimum number of alarm clocks to remove so that no $m$ consecutive minutes contain $k$ or more alarm clock start times.

Given:

- $n$ alarm clocks, each starting at time $a_i$ after midnight
- Vitalya wakes up if $k$ or more alarms start within any $m$ consecutive minutes

## Idea

### Approach 1

This problem can be solved using the [[2 Zettels/sliding window with fixed window size\|sliding window with fixed window size]] technique. The core idea is to maintain a window of size $m$ and greedily turn off alarms within that window to ensure that at most $k-1$ alarms are active. The "window" expands by one minute at a time, and at each step, we update the count of active alarms. If the number of alarms within the current window exceeds $k-1$, we turn off the necessary number of alarms at the current minute (`head`) to satisfy the condition. This greedy approach ensures that we minimize the total number of alarms turned off. The [[2 Zettels/sliding window with fixed window size (snake framework)\|sliding window with fixed window size (snake framework)]] provides a structured way to implement this.

The code maintains a `current_alarms` vector representing the number of alarms starting at each minute (like [[2 Zettels/frequency array\|frequency array]]). The `update_state` function greedily turns off alarms at the current minute (`head`) if the count of active alarms in the window exceeds $k-1$. The `undo_update_state` function simply undoes the count from the tail as the snake retreats.

**Time Complexity:** $O(\text{max\_time})$ where $\text{max\_time} \approx 10^6$
**Space Complexity:** $O(\text{max\_time})$ (freq arr)

### Approach 2

We can also sort the times, and apply concept of [[2 Zettels/using deque for sliding window problems\|using deque for sliding window problems]].

The core idea here is to maintain a deque that stores the indices of the alarm times within the current window of size $m$. The deque helps in efficiently identifying and removing the latest alarm times (greedy approach) when the number of alarms in the window exceeds $k-1$. By sorting the alarm times first, we ensure that we can process them in chronological order, making it easier to manage the alarms within the window.

Implementation wise, we again use the snake framework (best to imagine the deque as a snake that eats from the front and has a "tail" at the back). Observe the following:

- condition: `alarms[head + 1] - alarms[tail] < m` (eat until we reach window size)
- during process phase: turn off latest alarms by flushing from the `front` of the queue
- account for the tail as snake moves forward, but remove from the `back`

**Time Complexity:** $O(n \log n)$ (sorting) + $O(n)$ (sliding window)
**Space Complexity:** $O(n)$ (deque)

We can optimize this and reduce the space complexity by checking deque size before every push and updating answer as we "eat":

```cpp
while (head < n - 1 and alarms[head + 1] - alarms[tail] < m) {
  head++;
  if (dq.size() < k - 1)
    dq.push_front(head);
  else
    ans++;
}
```

With this, the space complexity becomes $O(k)$ since deque never grows beyond $k$.

## Code

```cpp
// Approach 1
const int MAX_TIME = 1e6 + 5;
vector<int> current_alarms(MAX_TIME); // Alarms currently 'on'

// Updates state when minute 'minute_idx' (head) enters the window
// Greedily turns off alarms at minute_idx if needed.
void update_state(int &count_alarms, int &turned_off_count, int minute_idx,
                  int k) {
  int alarms_at_minute = current_alarms[minute_idx];
  if (alarms_at_minute == 0) {
    return;
  }

  // How many alarms can we add without reaching k?
  int can_add = max(0, k - 1 - count_alarms);

  // How many must we turn off at this minute?
  int to_turn_off = max(0, alarms_at_minute - can_add);

  turned_off_count += to_turn_off;
  current_alarms[minute_idx] -= to_turn_off; // Mark as turned off

  // Add the count of alarms remaining 'on' at this minute
  count_alarms += current_alarms[minute_idx];
}

void undo_update_state(int &count_alarms, int minute_idx) {
  count_alarms -= current_alarms[minute_idx];
}

void solve() {
  int n, m, k;
  cin >> n >> m >> k;

  for (int i = 0; i < n; ++i) {
    int t;
    cin >> t;
    current_alarms[t]++;
  }

  int head = -1, tail = 0;
  int count_alarms = 0;     // State: alarms currently on in window [tail, head]
  int turned_off_count = 0; // Answer: total alarms turned off

  while (tail < MAX_TIME) {
    while (head + 1 < MAX_TIME && head - tail + 1 < m) {
      head++;
      // Update state and greedily turn off alarms if count reaches k
      update_state(count_alarms, turned_off_count, head, k);
    }

    // Process Window & Update Answer: (Implicitly done in update_state)
    // The condition `count_alarms < k` is maintained by update_state.

    if (tail <= head) {
      undo_update_state(count_alarms, tail);
    }

    tail++;
    head = max(head, tail - 1);
  }
  cout << turned_off_count << '\n';
}

// Approach 2
void solve() {
  int n, m, k;
  cin >> n >> m >> k;

  vector<int> alarms(n);

  for (int i = 0; i < n; ++i) {
    cin >> alarms[i];
  }

  sort(all(alarms));

  int ans = 0;
  deque<int> dq;

  int head = -1, tail = 0;

  while (tail < n) {
    while (head < n - 1 and alarms[head + 1] - alarms[tail] < m) {
      head++;
      dq.push_front(head);
    }

    while (int(dq.size()) >= k) {
      ans++;
      dq.pop_front(); // Remove later alarms
    }

    if (tail <= head) {
      if (!dq.empty() and dq.back() == tail)
        dq.pop_back();
    }

    tail++;
    head = max(head, tail - 1);
  }

  cout << ans << endl;
}
```

## Related
