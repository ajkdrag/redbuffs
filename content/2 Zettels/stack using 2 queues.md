---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-01-24T10:51:47.080+05:30"}
---


> [!Topics]
> - [[2 Zettels/stacks\|stacks]]
> - [[2 Zettels/queues\|queues]]

We use two queues:
- An active queue (our main storage) `q2`
- A temporary queue (our rearrangement assistant) `q1`

**Push Operation**: 
- When a new element arrives, it starts in the temporary queue, i.e. `q1.push(x)`
- We then transfer ALL existing elements from the active queue to the temporary queue, i.e. `move_from_q2_to_q1()`. This crucial step places the new element at the front, with all previous elements following it
- We then `swap(q1, q2)`, making the temporary queue our new active queue
    - This way, the last added element always stays at the front of the active queue, ensuring the correct behavior for `pop` and `top`

> [!Note]
> The invariants here is that the temporary queue is always empty for new element to arrive, while the active queue always maintains elements in LIFO order.

```cpp
class Solution {
public:
  // q1: temporary queue, q2: active queue
  queue<int> q1, q2;
  Solution() {}

  void move_from_q2_to_q1() {
    while (!q2.empty()) {
      q1.push(q2.front());
      q2.pop();
    }
  }

  void push(int x) {
    q1.push(x);
    move_from_q2_to_q1();
    // always make sure q1 points to empty queue
    swap(q1, q2);
  }

  int pop() {
    if (q2.empty())
      return -1;
    int val = q2.front();
    q2.pop();
    return val;
  }

  int top() {
    if (q2.empty())
      return -1;
    return q2.front();
  }

  bool empty() { return q2.empty(); }
};

```

**Time Complexity**
- Push: $O(n)$ (since `move_from_q2_to_q1` transfers elements in linear time)
- Pop and Top: $O(1)$

**Space Complexity**
- $O(n)$

## Related
